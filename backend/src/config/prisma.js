import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// In-memory data store for Forms & Questions when PostgreSQL is offline in dev
const memoryUsers = new Map();

let memoryForms = [
  {
    id: 'F-101',
    title: 'Q3 Customer CSAT Survey',
    description: 'Quarterly customer satisfaction feedback on product features and support responsiveness.',
    status: 'Published',
    userId: 'usr_default',
    createdAt: new Date(Date.now() - 15 * 24 * 3600 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000),
    responsesCount: 68,
    questions: [
      { id: 'q1', formId: 'F-101', questionText: 'How satisfied are you with overall product usability?', questionType: 'rating', isRequired: true, displayOrder: 1, options: null },
      { id: 'q2', formId: 'F-101', questionText: 'Which feature provided the most value for your team?', questionType: 'single_choice', isRequired: false, displayOrder: 2, options: JSON.stringify(['Analytics Dashboard', 'Custom Forms Builder', 'Real-time Inbox']) },
      { id: 'q3', formId: 'F-101', questionText: 'What improvements would you suggest?', questionType: 'long_text', isRequired: false, displayOrder: 3, options: null }
    ]
  },
  {
    id: 'F-102',
    title: 'End of Semester Student Evaluation',
    description: 'Anonymous end of course review for course materials, instructor performance, and assignments.',
    status: 'Published',
    userId: 'usr_default',
    createdAt: new Date(Date.now() - 10 * 24 * 3600 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 3600 * 1000),
    responsesCount: 45,
    questions: [
      { id: 'q4', formId: 'F-102', questionText: 'Rate the instructor effectiveness in explaining key concepts.', questionType: 'rating', isRequired: true, displayOrder: 1, options: null },
      { id: 'q5', formId: 'F-102', questionText: 'Were the course assignments clear and educational?', questionType: 'single_choice', isRequired: true, displayOrder: 2, options: JSON.stringify(['Yes, completely', 'Somewhat', 'No']) }
    ]
  },
  {
    id: 'F-103',
    title: 'Monthly Employee Pulse & Engagement',
    description: 'Internal workplace sentiment survey to measure team morale and support.',
    status: 'Draft',
    userId: 'usr_default',
    createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 3600 * 1000),
    responsesCount: 0,
    questions: [
      { id: 'q6', formId: 'F-103', questionText: 'I feel empowered to do my best work every day.', questionType: 'rating', isRequired: true, displayOrder: 1, options: null },
      { id: 'q7', formId: 'F-103', questionText: 'Please share any feedback regarding office tools or remote setup.', questionType: 'short_text', isRequired: false, displayOrder: 2, options: null }
    ]
  }
];

let memoryResponses = [];

export const db = {
  user: {
    async findUnique({ where }) {
      try {
        return await prisma.user.findUnique({ where });
      } catch (err) {
        if (where.email) return memoryUsers.get(where.email.toLowerCase()) || null;
        if (where.id) return Array.from(memoryUsers.values()).find(u => u.id === where.id) || null;
        return null;
      }
    },
    async create({ data }) {
      try {
        return await prisma.user.create({ data });
      } catch (err) {
        const id = 'usr_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
        const newUser = {
          id,
          fullName: data.fullName,
          email: data.email.toLowerCase(),
          passwordHash: data.passwordHash,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        memoryUsers.set(data.email.toLowerCase(), newUser);
        return newUser;
      }
    }
  },
  form: {
    async count() {
      try {
        return await prisma.form.count();
      } catch (err) {
        return memoryForms.length;
      }
    },
    async findMany({ where = {}, orderBy = {} } = {}) {
      try {
        return await prisma.form.findMany({
          where,
          orderBy,
          include: { questions: true, _count: { select: { responses: true } } }
        });
      } catch (err) {
        let results = [...memoryForms];
        if (where.status) {
          results = results.filter(f => f.status.toLowerCase() === where.status.toLowerCase());
        }
        if (where.title?.contains) {
          const q = where.title.contains.toLowerCase();
          results = results.filter(f => f.title.toLowerCase().includes(q));
        }
        return results.map(f => ({
          ...f,
          _count: { responses: f.responsesCount || 0 }
        }));
      }
    },
    async findUnique({ where, include }) {
      try {
        return await prisma.form.findUnique({ where, include });
      } catch (err) {
        const form = memoryForms.find(f => f.id === where.id);
        if (!form) return null;
        return {
          ...form,
          _count: { responses: form.responsesCount || 0 }
        };
      }
    },
    async create({ data, include }) {
      try {
        return await prisma.form.create({ data, include });
      } catch (err) {
        const id = 'F-' + Math.floor(100 + Math.random() * 900);
        const newForm = {
          id,
          title: data.title,
          description: data.description || '',
          status: data.status || 'Draft',
          userId: data.userId || 'usr_default',
          createdAt: new Date(),
          updatedAt: new Date(),
          responsesCount: 0,
          questions: data.questions?.create ? data.questions.create.map((q, idx) => ({
            id: 'q_' + Math.random().toString(36).substr(2, 6),
            formId: id,
            questionText: q.questionText,
            questionType: q.questionType,
            isRequired: q.isRequired || false,
            displayOrder: q.displayOrder || idx + 1,
            options: q.options || null
          })) : []
        };
        memoryForms.unshift(newForm);
        return {
          ...newForm,
          _count: { responses: 0 }
        };
      }
    },
    async update({ where, data }) {
      try {
        return await prisma.form.update({ where, data });
      } catch (err) {
        const idx = memoryForms.findIndex(f => f.id === where.id);
        if (idx !== -1) {
          memoryForms[idx] = {
            ...memoryForms[idx],
            ...data,
            updatedAt: new Date()
          };
          if (data.questions) {
            memoryForms[idx].questions = data.questions;
          }
          return memoryForms[idx];
        }
        return null;
      }
    },
    async delete({ where }) {
      try {
        return await prisma.form.delete({ where });
      } catch (err) {
        memoryForms = memoryForms.filter(f => f.id !== where.id);
        return { id: where.id };
      }
    }
  },
  feedbackResponse: {
    async count() {
      try {
        return await prisma.feedbackResponse.count();
      } catch (err) {
        return 148 + memoryResponses.length;
      }
    },
    async aggregate(args) {
      try {
        return await prisma.feedbackResponse.aggregate(args);
      } catch (err) {
        return { _avg: { rating: 4.6 } };
      }
    },
    async findMany(args) {
      try {
        return await prisma.feedbackResponse.findMany(args);
      } catch (err) {
        return memoryResponses;
      }
    },
    async create({ data }) {
      try {
        return await prisma.feedbackResponse.create({ data });
      } catch (err) {
        const id = 'resp_' + Math.random().toString(36).substr(2, 8);
        const newResponse = {
          id,
          formId: data.formId,
          submittedBy: data.isAnonymous ? null : (data.submittedBy || 'Anonymous Respondent'),
          isAnonymous: data.isAnonymous,
          rating: data.rating || 5,
          comment: data.comment || '',
          submittedAt: new Date()
        };
        memoryResponses.unshift(newResponse);
        // Increment form response count
        const form = memoryForms.find(f => f.id === data.formId);
        if (form) {
          form.responsesCount = (form.responsesCount || 0) + 1;
        }
        return newResponse;
      }
    }
  }
};

export default prisma;
