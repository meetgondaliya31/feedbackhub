import { db } from '../config/prisma.js';

// Seed mock response records for dev analytics
const sampleResponsesList = [
  {
    id: 'resp_101',
    formId: 'F-101',
    formTitle: 'Q3 Customer CSAT Survey',
    submittedBy: null,
    isAnonymous: true,
    rating: 5,
    status: 'Completed',
    submittedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    answers: [
      { questionText: 'How satisfied are you with overall product usability?', answerText: '5 Stars - Excellent' },
      { questionText: 'Which feature provided the most value for your team?', answerText: 'Analytics Dashboard' },
      { questionText: 'What improvements would you suggest?', answerText: 'The new analytics UI is lightning fast and very intuitive.' }
    ]
  },
  {
    id: 'resp_102',
    formId: 'F-102',
    formTitle: 'End of Semester Student Evaluation',
    submittedBy: 'Dr. Arthur Pendelton (a.pendelton@edutopia.edu)',
    isAnonymous: false,
    rating: 5,
    status: 'Completed',
    submittedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    answers: [
      { questionText: 'Rate the instructor effectiveness in explaining key concepts.', answerText: '5 Stars - Excellent' },
      { questionText: 'Were the course assignments clear and educational?', answerText: 'Yes, completely' }
    ]
  },
  {
    id: 'resp_103',
    formId: 'F-101',
    formTitle: 'Q3 Customer CSAT Survey',
    submittedBy: 'Elena Rostova (elena@techflow.io)',
    isAnonymous: false,
    rating: 5,
    status: 'Completed',
    submittedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    answers: [
      { questionText: 'How satisfied are you with overall product usability?', answerText: '5 Stars - Excellent' },
      { questionText: 'Which feature provided the most value for your team?', answerText: 'Real-time Inbox' },
      { questionText: 'What improvements would you suggest?', answerText: 'Response collection speed is remarkable.' }
    ]
  },
  {
    id: 'resp_104',
    formId: 'F-103',
    formTitle: 'Monthly Employee Pulse & Engagement',
    submittedBy: null,
    isAnonymous: true,
    rating: 4,
    status: 'Completed',
    submittedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    answers: [
      { questionText: 'I feel empowered to do my best work every day.', answerText: '4 Stars - Good' },
      { questionText: 'Please share any feedback regarding office tools or remote setup.', answerText: 'Weekly team morale is high and pulse surveys are helpful.' }
    ]
  },
  {
    id: 'resp_105',
    formId: 'F-102',
    formTitle: 'End of Semester Student Evaluation',
    submittedBy: null,
    isAnonymous: true,
    rating: 5,
    status: 'Completed',
    submittedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    answers: [
      { questionText: 'Rate the instructor effectiveness in explaining key concepts.', answerText: '5 Stars - Excellent' },
      { questionText: 'Were the course assignments clear and educational?', answerText: 'Yes, completely' }
    ]
  }
];

/**
 * @route   GET /api/responses
 * @desc    Get all submitted responses with search, filtering, and pagination
 * @access  Protected
 */
export const getResponses = async (req, res) => {
  try {
    const { 
      formId, 
      rating, 
      anonymous, 
      search, 
      sortBy = 'newest', 
      page = 1, 
      limit = 10 
    } = req.query;

    let filtered = [...sampleResponsesList];

    if (formId && formId !== 'All') {
      filtered = filtered.filter(r => r.formId === formId);
    }
    if (rating && rating !== 'All') {
      filtered = filtered.filter(r => r.rating === Number(rating));
    }
    if (anonymous && anonymous !== 'All') {
      const isAnon = anonymous === 'true' || anonymous === 'anonymous';
      filtered = filtered.filter(r => r.isAnonymous === isAnon);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(r => 
        r.formTitle.toLowerCase().includes(q) ||
        (r.submittedBy && r.submittedBy.toLowerCase().includes(q)) ||
        r.answers.some(a => a.answerText.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
    } else if (sortBy === 'highest') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'lowest') {
      filtered.sort((a, b) => a.rating - b.rating);
    } else {
      // newest
      filtered.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    }

    const total = filtered.length;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const paginated = filtered.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    return res.status(200).json({
      success: true,
      data: paginated,
      pagination: {
        total,
        page: pageNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Error fetching responses:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve submitted responses'
    });
  }
};

/**
 * @route   GET /api/responses/export
 * @desc    Export feedback responses to CSV format
 * @access  Protected
 */
export const exportResponsesCSV = async (req, res) => {
  try {
    const headers = ['Form Name', 'Submission Date', 'Rating', 'Anonymous', 'Submitted By', 'Response Snippet'];
    
    const rows = sampleResponsesList.map(r => [
      `"${r.formTitle}"`,
      `"${new Date(r.submittedAt).toLocaleString()}"`,
      `"${r.rating} Stars"`,
      `"${r.isAnonymous ? 'Yes' : 'No'}"`,
      `"${r.submittedBy || 'Anonymous'}"`,
      `"${r.answers.map(a => a.answerText).join('; ').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=FeedbackHub_Responses_Export.csv');
    return res.status(200).send(csvContent);
  } catch (error) {
    console.error('Error exporting responses CSV:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to export CSV report'
    });
  }
};

/**
 * @route   GET /api/responses/:id
 * @desc    Get single response details by ID
 * @access  Protected
 */
export const getResponseById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = sampleResponsesList.find(r => r.id === id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Feedback response not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Error fetching response by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve response details'
    });
  }
};

/**
 * @route   DELETE /api/responses/:id
 * @desc    Delete a response record
 * @access  Protected
 */
export const deleteResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const idx = sampleResponsesList.findIndex(r => r.id === id);
    if (idx !== -1) {
      sampleResponsesList.splice(idx, 1);
    }

    return res.status(200).json({
      success: true,
      message: 'Response deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting response:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete response'
    });
  }
};
