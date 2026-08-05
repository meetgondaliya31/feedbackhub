import { db } from '../config/prisma.js';

/**
 * @route   GET /api/public/forms/:id
 * @desc    Load published form and questions for public respondents
 * @access  Public
 */
export const getPublicForm = async (req, res) => {
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

    // Security Check: Only Published Forms can accept responses
    if (form.status !== 'Published') {
      return res.status(403).json({
        success: false,
        message: 'This feedback form is currently unpublished or unavailable for submissions.'
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: form.id,
        title: form.title,
        description: form.description,
        status: form.status,
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
    console.error('Error fetching public form:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error loading feedback form'
    });
  }
};

/**
 * @route   POST /api/public/forms/:id/submit
 * @desc    Submit answers for a published feedback form
 * @access  Public
 */
export const submitPublicFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { answers = {}, isAnonymous = true, submittedBy } = req.body;

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

    if (form.status !== 'Published') {
      return res.status(403).json({
        success: false,
        message: 'Submissions are disabled because this form is not currently published.'
      });
    }

    // Server-side Validation: Check all required questions
    const missingRequired = [];
    (form.questions || []).forEach(q => {
      if (q.isRequired) {
        const val = answers[q.id];
        if (val === undefined || val === null || (typeof val === 'string' && !val.trim()) || (Array.isArray(val) && val.length === 0)) {
          missingRequired.push(q.questionText);
        }
      }
    });

    if (missingRequired.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Please answer all required questions before submitting: ${missingRequired[0]}`
      });
    }

    // Calculate rating score if rating question exists
    let overallRating = 5;
    const ratingQuestion = (form.questions || []).find(q => q.questionType === 'rating');
    if (ratingQuestion && answers[ratingQuestion.id]) {
      overallRating = Number(answers[ratingQuestion.id]);
    }

    // Save Feedback Response
    await db.feedbackResponse.create({
      data: {
        formId: id,
        isAnonymous: Boolean(isAnonymous),
        submittedBy: isAnonymous ? null : (submittedBy || 'Identified Respondent'),
        rating: overallRating,
        comment: Object.values(answers).filter(v => typeof v === 'string').join(' | ')
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Feedback submitted successfully'
    });
  } catch (error) {
    console.error('Error submitting feedback response:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while saving your feedback response. Please try again.'
    });
  }
};
