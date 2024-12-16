import express from 'express';
import { validateSchema } from '../middlewares/validation.middleware';
import { createLeadSchema, updateLeadSchema } from './leads.schema';
import * as LeadController from './leads.controller';

const router = express.Router();

// Rotas para leads
router.get('/', LeadController.getLeads);
router.get('/:id', LeadController.getLead);
router.post('/', validateSchema(createLeadSchema), LeadController.createLead);
router.put('/:id', validateSchema(updateLeadSchema), LeadController.updateLead);
router.delete('/:id', LeadController.deleteLead);

export default router;
