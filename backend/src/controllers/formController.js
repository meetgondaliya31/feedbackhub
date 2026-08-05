import { db } from '../config/prisma.js';

/**
 * @route   GET /api/forms
 * @desc    Get all feedback forms with search, status filtering, and sorting
 * @access  Protected
 */
export const getForms = async (req, res) => {
  try {
    const { search, status, sortBy } = req.query;

    const where = {};
    if (status && status !== 'All') {
      where.status = status;
    }
    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }

    const forms = await db.form.findMany({
      where,
      orderBy: { createdAt: sortBy === 'oldest' ? 'asc' : 'desc' }
    });

    const formatted = forms.map(f => ({
      id: f.id,
      title: f.title,
      description: f.description,
      status: f.status,
      questionsCount: f.questions ? f.questions.length : 0,
      responsesCount: f._count ? f._count.responses : (f.responsesCount || 0),
      createdAt: f.createdAt,
      updatedAt: f.updatedAt
    }));

    return res.status(200).json({
      success: true,
      data: formatted
    });
  } catch (error) {
    console.error('Error fetching forms:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve feedback forms'
    });
  }
};

/**
 * @route   GET /api/forms/:id
 * @desc    Get single form details by ID including questions
 * @access  Protected / Public for widget
 */
export const getFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await db.form.findUnique({
      where: { id },
      include: { questions: true }
    });

    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Feedback form not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: form.id,
        title: form.title,
        description: form.description,
        status: form.status,
        createdAt: form.createdAt,
        updatedAt: form.updatedAt,
        responsesCount: form._count ? form._count.responses : (form.responsesCount || 0),
        questions: (form.questions || []).map(q => ({
          id: q.id,
          questionText: q.questionText,
          questionType: q.questionType,
          isRequired: q.isRequired,
          displayOrder: q.displayOrder,
          options: q.options ? (typeof q.options === 'string' ? JSON.parse(q.options) : q.options) : []
        }))
      }
    });
  } catch (error) {
    console.error('Error fetching form by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve form details'
    });
  }
};

/**
 * @route   POST /api/forms
 * @desc    Create a new feedback form with questions
 * @access  Protected
 */
export const createForm = async (req, res) => {
  try {
    const { title, description, status = 'Draft', questions = [] } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Form title is required'
      });
    }

    if (status === 'Published' && questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot publish a form without at least one question.'
      });
    }

    const formattedQuestions = questions.map((q, idx) => ({
      questionText: q.questionText.trim(),
      questionType: q.questionType || 'short_text',
      isRequired: Boolean(q.isRequired),
      displayOrder: idx + 1,
      options: Array.isArray(q.options) ? JSON.stringify(q.options) : null
    }));

    const newForm = await db.form.create({
      data: {
        title: title.trim(),
        description: description ? description.trim() : '',
        status: status,
        userId: req.user?.id || 'usr_default',
        questions: {
          create: formattedQuestions
        }
      },
      include: { questions: true }
    });

    return res.status(201).json({
      success: true,
      message: status === 'Published' ? 'Form published successfully' : 'Draft saved successfully',
      data: newForm
    });
  } catch (error) {
    console.error('Error creating form:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create feedback form'
    });
  }
};

/**
 * @route   PUT /api/forms/:id
 * @desc    Update existing feedback form and questions
 * @access  Protected
 */
export const updateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, questions = [] } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Form title is required'
      });
    }

    if (status === 'Published' && questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot publish a form without at least one question.'
      });
    }

    const updated = await db.form.update({
      where: { id },
      data: {
        title: title.trim(),
        description: description !== undefined ? description.trim() : '',
        status: status || 'Draft',
        questions: questions.map((q, idx) => ({
          id: q.id || 'q_' + Math.random().toString(36).substr(2, 6),
          formId: id,
          questionText: q.questionText.trim(),
          questionType: q.questionType || 'short_text',
          isRequired: Boolean(q.isRequired),
          displayOrder: idx + 1,
          options: Array.isArray(q.options) ? JSON.stringify(q.options) : null
        }))
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Form updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error updating form:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update feedback form'
    });
  }
};

/**
 * @route   DELETE /api/forms/:id
 * @desc    Delete a feedback form
 * @access  Protected
 */
export const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    await db.form.delete({ where: { id } });

    return res.status(200).json({
      success: true,
      message: 'Form deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting form:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete feedback form'
    });
  }
};

/**
 * @route   POST /api/forms/:id/duplicate
 * @desc    Duplicate an existing form (copies title & questions, status becomes Draft)
 * @access  Protected
 */
export const duplicateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await db.form.findUnique({
      where: { id },
      include: { questions: true }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Original form not found'
      });
    }

    const duplicated = await db.form.create({
      data: {
        title: `Copy of ${existing.title}`,
        description: existing.description,
        status: 'Draft',
        userId: req.user?.id || 'usr_default',
        questions: {
          create: (existing.questions || []).map((q, idx) => ({
            questionText: q.questionText,
            questionType: q.questionType,
            isRequired: q.isRequired,
            displayOrder: idx + 1,
            options: q.options
          }))
        }
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Form duplicated successfully as Draft',
      data: duplicated
    });
  } catch (error) {
    console.error('Error duplicating form:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to duplicate form'
    });
  }
};

/**
 * @route   PATCH /api/forms/:id/status
 * @desc    Update form status (Draft -> Published -> Archived)
 * @access  Protected
 */
export const updateFormStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Draft', 'Published', 'Archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value. Must be Draft, Published, or Archived.'
      });
    }

    const existing = await db.form.findUnique({
      where: { id },
      include: { questions: true }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Form not found'
      });
    }

    if (status === 'Published' && (!existing.questions || existing.questions.length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot publish a form without at least one question.'
      });
    }

    const updated = await db.form.update({
      where: { id },
      data: { status }
    });

    return res.status(200).json({
      success: true,
      message: `Form status updated to ${status}`,
      data: updated
    });
  } catch (error) {
    console.error('Error updating form status:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update form status'
    });
  }
};
