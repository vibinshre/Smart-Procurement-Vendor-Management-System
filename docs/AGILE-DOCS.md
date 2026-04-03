# Agile Documentation
## Smart Procurement & Vendor Management System — Group 2

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Agile Methodology](#2-agile-methodology)
3. [Roles & Responsibilities](#3-roles--responsibilities)
4. [Product Backlog](#4-product-backlog)
5. [User Stories](#5-user-stories)
6. [Sprint Plans](#6-sprint-plans)
   - [Sprint 1 — Foundation & Authentication](#sprint-1--foundation--authentication)
   - [Sprint 2 — Approvals & Purchase Orders](#sprint-2--approvals--purchase-orders)
   - [Sprint 3 — Invoicing, Deliveries & Payments](#sprint-3--invoicing-deliveries--payments)
   - [Sprint 4 — Reports, Polish & Deployment](#sprint-4--reports-polish--deployment)
7. [Definition of Done](#7-definition-of-done)
8. [Sprint Retrospectives](#8-sprint-retrospectives)
9. [Burndown Summary](#9-burndown-summary)

---

## 1. Project Overview

| Field | Details |
|---|---|
| **Project Name** | Smart Procurement & Vendor Management System |
| **Team** | Group 2 |
| **Methodology** | Agile (Scrum) |
| **Sprint Duration** | 2 weeks |
| **Total Sprints** | 4 |
| **Tech Stack** | React 19 + Vite (Frontend), Spring Boot 3.2 / Java 21 (Backend), MySQL 8 |

### Objective

Build a full-stack procurement management platform enabling employees, managers, admins, vendors, and finance teams to manage the complete procure-to-pay lifecycle — from requisition to payment — with role-based access control.

### Core Workflow

```
Employee → Requisition
         → Manager Approval
         → Admin creates Purchase Order + assigns Vendor
         → Vendor updates Delivery + submits Invoice
         → Finance verifies Invoice + processes Payment
         → Reports & Analytics
```

---

## 2. Agile Methodology

The team follows the **Scrum** framework with the following ceremonies:

| Ceremony | Frequency | Duration | Purpose |
|---|---|---|---|
| Sprint Planning | Start of each sprint | 2 hours | Define sprint goal and backlog items |
| Daily Stand-up | Every weekday | 15 minutes | Sync progress, blockers, plans |
| Sprint Review | End of each sprint | 1 hour | Demo working software to stakeholders |
| Sprint Retrospective | End of each sprint | 45 minutes | Reflect and improve team process |
| Backlog Refinement | Mid-sprint | 1 hour | Groom and estimate upcoming stories |

### Story Point Scale (Fibonacci)

| Points | Complexity |
|---|---|
| 1 | Trivial — config change or minor fix |
| 2 | Simple — few lines, clear path |
| 3 | Small — well understood, minor risk |
| 5 | Medium — some complexity or unknowns |
| 8 | Large — significant effort, some risk |
| 13 | Very large — consider splitting |

---

## 3. Roles & Responsibilities

| Role | Responsibilities |
|---|---|
| **Product Owner** | Maintains and prioritizes the product backlog; accepts or rejects sprint deliverables |
| **Scrum Master** | Facilitates Scrum ceremonies; removes blockers; shields team from external interference |
| **Backend Developer** | Spring Boot API, database schema, business logic, security |
| **Frontend Developer** | React components, pages, routing, API integration |
| **Full-Stack / DevOps** | Docker setup, integration, deployment, CI/CD pipeline |
| **QA** | Test planning, test execution, bug reporting |

### System User Roles

| System Role | Access Level |
|---|---|
| Employee | Create requisitions, track own requests |
| Manager | View and approve/reject requisitions |
| Admin | Manage vendors, create POs, manage users |
| Vendor | View assigned POs, submit invoices, update delivery |
| Finance | Verify invoices, process payments, view reports |

---

## 4. Product Backlog

### Epics

| Epic ID | Epic Name | Description |
|---|---|---|
| E-01 | Authentication & Authorization | Login, roles, JWT, session management |
| E-02 | Requisition Management | Employee requisition creation and tracking |
| E-03 | Approval Workflow | Manager approval and rejection flow |
| E-04 | Vendor Management | Register, list, and manage vendors |
| E-05 | Purchase Orders | PO creation linked to requisitions and vendors |
| E-06 | Delivery Management | Vendor delivery status updates |
| E-07 | Invoice Management | Vendor invoice submission and finance verification |
| E-08 | Payment Processing | Finance payment processing and status |
| E-09 | Reports & Analytics | Procurement dashboards and spend reports |
| E-10 | Infrastructure | Docker, CI/CD, environment configuration |

### Full Backlog

| ID | Epic | User Story | Priority | Points | Sprint | Status |
|---|---|---|---|---|---|---|
| US-01 | E-02 | As an employee, I can create a procurement requisition | High | 5 | 1 | ✅ Done |
| US-02 | E-02 | As an employee, I can track the status of my requisition | High | 3 | 1 | ✅ Done |
| US-03 | E-03 | As a manager, I can approve or reject a requisition | High | 5 | 2 | ✅ Done |
| US-04 | E-03 | As a manager, I can view all pending approvals in a dashboard | Medium | 3 | 2 | ✅ Done |
| US-05 | E-05 | As an admin, I can create a PO linked to an approved requisition | High | 8 | 2 | ✅ Done |
| US-06 | E-05 | As an admin, I can assign a vendor to a PO | High | 5 | 2 | ✅ Done |
| US-07 | E-04 | As an admin, I can register and manage vendors | High | 5 | 2 | ✅ Done |
| US-08 | E-04 | As a vendor, I can log in and view my assigned POs | High | 5 | 2 | ✅ Done |
| US-09 | E-07 | As a vendor, I can submit an invoice against a PO | High | 5 | 3 | ✅ Done |
| US-10 | E-07 | As finance, I can view and verify submitted invoices | High | 3 | 3 | ✅ Done |
| US-11 | E-06 | As a vendor, I can update delivery status for a PO | Medium | 3 | 3 | ✅ Done |
| US-12 | E-08 | As finance, I can mark an invoice as paid | Medium | 3 | 3 | ✅ Done |
| US-13 | E-09 | As admin/finance, I can view procurement reports | Medium | 5 | 4 | 🔄 In Progress |
| US-14 | E-01 | As any user, I can log in with role-based access | High | 8 | 1 | ✅ Done |
| US-15 | E-01 | As admin, I can manage users and assign roles | Medium | 5 | 4 | ✅ Done |
| US-16 | E-10 | Docker Compose for full-stack local dev | High | 3 | 1 | ✅ Done |
| US-17 | E-10 | CI/CD pipeline for automated build and test | Low | 5 | 4 | 🔄 In Progress |

**Total Story Points:** 88  
**Completed:** 73  
**In Progress:** 15

---

## 5. User Stories

### US-01 — Create Requisition

**As an** employee  
**I want to** submit a procurement requisition  
**So that** I can formally request materials or services needed for my work

**Acceptance Criteria:**
- [ ] Form captures: title, description, quantity, estimated cost, urgency (Low/Medium/High)
- [ ] Submitted requisition is visible in manager's pending approval queue
- [ ] Employee sees a confirmation message after successful submission
- [ ] Default status is `PENDING`
- [ ] Employee cannot edit a requisition once submitted

---

### US-02 — Track Requisition Status

**As an** employee  
**I want to** view the current status of my requisitions  
**So that** I know whether my request has been approved, rejected, or is still pending

**Acceptance Criteria:**
- [ ] Employee sees list of all their own requisitions
- [ ] Status clearly shown: PENDING / APPROVED / REJECTED
- [ ] Rejection reason displayed when status is REJECTED
- [ ] Linked PO shown when requisition is APPROVED and PO created

---

### US-03 — Approve or Reject Requisition

**As a** manager  
**I want to** review and act on employee requisitions  
**So that** procurement proceeds only for valid, authorized requests

**Acceptance Criteria:**
- [ ] Manager sees all PENDING requisitions assigned to them
- [ ] Approve action transitions status to APPROVED
- [ ] Reject action requires a mandatory rejection reason
- [ ] Employee is notified (status change visible on their dashboard)
- [ ] Timestamps recorded for approval/rejection actions

---

### US-05 — Create Purchase Order

**As an** admin/procurement officer  
**I want to** generate a Purchase Order from an approved requisition  
**So that** the vendor can fulfill the request

**Acceptance Criteria:**
- [ ] PO is linked to a specific approved requisition
- [ ] Admin selects a vendor from registered vendor list
- [ ] PO captures: line items, quantities, unit prices, expected delivery date
- [ ] PO initial status is `SENT`
- [ ] PO number is auto-generated and unique

---

### US-07 — Manage Vendors

**As an** admin  
**I want to** register, view, update, and deactivate vendors  
**So that** only authorized vendors participate in procurement

**Acceptance Criteria:**
- [ ] Admin can create a vendor profile (name, contact, category, bank details)
- [ ] Vendor list is searchable and filterable by category/status
- [ ] Admin can deactivate a vendor without deleting their history
- [ ] Vendors can self-register via a sign-up form (pending admin approval)

---

### US-09 — Submit Invoice

**As a** vendor  
**I want to** submit an invoice against a completed PO  
**So that** I can get paid for goods or services delivered

**Acceptance Criteria:**
- [ ] Vendor can create an invoice linked to a specific PO
- [ ] Invoice captures: amount, date, reference number, line items
- [ ] Invoice cannot exceed PO value
- [ ] Finance team is notified of new invoice submission
- [ ] Invoice statuses: SUBMITTED → VERIFIED → PAID

---

### US-11 — Update Delivery Status

**As a** vendor  
**I want to** update the delivery status of my assigned PO  
**So that** the admin and finance team know the goods have been dispatched or delivered

**Acceptance Criteria:**
- [ ] Vendor can mark delivery as: DISPATCHED / DELIVERED / PARTIAL
- [ ] Delivery date and tracking reference can be recorded
- [ ] Admin and finance see delivery updates in real time
- [ ] Invoice submission is enabled only after delivery is marked DELIVERED

---

### US-14 — Role-Based Authentication

**As any** user  
**I want to** log in with my credentials  
**So that** I only see features relevant to my role

**Acceptance Criteria:**
- [ ] Login page with email and password
- [ ] JWT token issued on successful login
- [ ] Token stored securely (httpOnly or memory)
- [ ] Role-based redirect after login (e.g. Manager → Approvals, Vendor → PO List)
- [ ] Unauthorized routes return 403 Forbidden
- [ ] Session expires after 8 hours of inactivity

---

## 6. Sprint Plans

---

### Sprint 1 — Foundation & Authentication

**Sprint Goal:** Set up infrastructure, authentication, and core requisition creation/tracking  
**Dates:** Week 1–2  
**Velocity Target:** 24 points

| Story ID | Task | Assignee | Points | Status |
|---|---|---|---|---|
| US-16 | MySQL schema + Docker Compose setup | DevOps | 3 | ✅ Done |
| US-14 | Spring Boot project, Security config, JWT | Backend | 5 | ✅ Done |
| US-14 | Login/Register API endpoints | Backend | 3 | ✅ Done |
| US-14 | React project setup (Vite, Router, Axios) | Frontend | 3 | ✅ Done |
| US-14 | Login page + role-based redirect | Frontend | 3 | ✅ Done |
| US-01 | Requisition model, repo, service, controller | Backend | 5 | ✅ Done |
| US-01 | Requisition creation form (React) | Frontend | 3 | ✅ Done |
| US-02 | Requisition status tracking page | Frontend | 2 | ✅ Done |

**Sprint Total: 27 points**  
**Completed: 27 points**  
**Velocity: 27**

**Sprint Review Notes:**
- JWT authentication working end-to-end across all roles
- Requisition CRUD fully operational on backend and frontend
- Docker Compose runs all three services (MySQL, Backend, Frontend) with one command

---

### Sprint 2 — Approvals & Purchase Orders

**Sprint Goal:** Complete manager approval workflow and PO creation linked to vendors  
**Dates:** Week 3–4  
**Velocity Target:** 27 points (based on Sprint 1 velocity)

| Story ID | Task | Assignee | Points | Status |
|---|---|---|---|---|
| US-03 | Approval model, service, controller | Backend | 5 | ✅ Done |
| US-03 | Approve/Reject API with requisition status update | Backend | 3 | ✅ Done |
| US-04 | Manager approval dashboard (React) | Frontend | 3 | ✅ Done |
| US-07 | Vendor model, service, controller (CRUD) | Backend | 5 | ✅ Done |
| US-07 | Vendor management page (React) | Frontend | 3 | ✅ Done |
| US-08 | Vendor login + PO list view | Frontend | 3 | ✅ Done |
| US-05 | PO model, service, controller | Backend | 8 | ✅ Done |
| US-06 | Assign vendor to PO + update PO status | Backend | 3 | ✅ Done |
| US-05 | PO creation form linked to approved requisitions | Frontend | 5 | ✅ Done |

**Sprint Total: 38 points**  
**Completed: 38 points**  
**Velocity: 38**

**Sprint Review Notes:**
- Full approval workflow tested end-to-end: Employee → Manager → Admin
- POs can be created from approved requisitions and linked to vendors
- Vendor dropdown populated from registered vendor list

---

### Sprint 3 — Invoicing, Deliveries & Payments

**Sprint Goal:** Complete the vendor-side workflow: delivery updates, invoice submission, and payment processing  
**Dates:** Week 5–6  
**Velocity Target:** 35 points

| Story ID | Task | Assignee | Points | Status |
|---|---|---|---|---|
| US-09 | Invoice model, service, controller | Backend | 5 | ✅ Done |
| US-09 | Invoice submission form (Vendor UI) | Frontend | 3 | ✅ Done |
| US-10 | Finance invoice verification page | Frontend | 3 | ✅ Done |
| US-11 | Delivery model and status update API | Backend | 3 | ✅ Done |
| US-11 | Delivery status update (Vendor UI) | Frontend | 3 | ✅ Done |
| US-12 | Payment processing endpoint (mark as paid) | Backend | 3 | ✅ Done |
| US-12 | Payment action in Finance dashboard | Frontend | 2 | ✅ Done |
| TECH | Global Axios error interceptor + loading states | Frontend | 2 | ✅ Done |
| TECH | Backend input validation (JSR-303 annotations) | Backend | 3 | ✅ Done |

**Sprint Total: 27 points**  
**Completed: 27 points**  
**Velocity: 27**

**Sprint Review Notes:**
- Full procure-to-pay cycle is operational: Requisition → PO → Delivery → Invoice → Payment
- Invoice and delivery statuses update correctly and are reflected across all relevant roles
- Input validation added on both frontend and backend to prevent bad data

---

### Sprint 4 — Reports, Polish & Deployment

**Sprint Goal:** Reports module, admin user management, testing, documentation, and production deployment  
**Dates:** Week 7–8  
**Velocity Target:** 30 points

| Story ID | Task | Assignee | Points | Status |
|---|---|---|---|---|
| US-13 | Reports API (spend by vendor, PO summary, monthly) | Backend | 5 | 🔄 In Progress |
| US-13 | Reports dashboard with charts (React) | Frontend | 5 | 🔄 In Progress |
| US-15 | Admin user management — CRUD + role assignment | Backend | 5 | ✅ Done |
| US-15 | Admin user management page | Frontend | 3 | ✅ Done |
| US-17 | GitHub Actions CI pipeline (build + test) | DevOps | 5 | 🔄 In Progress |
| TEST | Unit tests — backend service layer (JUnit) | Backend | 5 | ✅ Done |
| TEST | Integration tests — key API flows (Postman/REST) | Backend | 5 | 🔄 In Progress |
| DOCS | README finalized with full setup guide | All | 2 | ✅ Done |
| DOCS | Agile documentation finalized | All | 2 | ✅ Done |
| DEPLOY | Production Docker Compose + Nginx config | DevOps | 3 | ✅ Done |

**Sprint Total: 40 points**  
**Completed (so far): 25 points**  
**In Progress: 15 points**

---

## 7. Definition of Done

A user story or task is considered **Done** when ALL of the following criteria are met:

### Code Quality
- [ ] Feature fully implemented per all acceptance criteria
- [ ] Code follows team conventions (naming, structure, formatting)
- [ ] No hardcoded credentials, secrets, or environment-specific values in source code
- [ ] No console errors or warnings in production build

### Testing
- [ ] Unit tests written and passing (minimum 70% coverage on service layer)
- [ ] Integration tests pass for the feature's API endpoints
- [ ] Manual testing completed for happy path and known edge cases
- [ ] No P1 (critical) or P2 (high) bugs open against this story

### Code Review
- [ ] Pull request raised with a clear description
- [ ] At least one team member has reviewed and approved the PR
- [ ] All review comments addressed or discussed before merge
- [ ] PR merged into `main` branch via squash commit

### Documentation
- [ ] API endpoints documented in Postman or with inline Javadoc/OpenAPI comments
- [ ] README updated if setup steps have changed
- [ ] Backlog status updated to reflect completion

### Deployment
- [ ] Feature works correctly in local Docker environment
- [ ] No regression in existing features (smoke tested)
- [ ] Build passes in CI pipeline (when available)

---

## 8. Sprint Retrospectives

### Sprint 1 Retrospective

| Category | Notes |
|---|---|
| ✅ What went well | Fast project setup; Docker Compose working from day 1; JWT auth clean and extensible; clear frontend/backend API contracts agreed upfront |
| ❌ What to improve | Frontend error handling was absent — API errors crashed silently; no loading states |
| 🔧 Action item | Add global Axios error interceptor and loading state in Sprint 2; assign one person to own frontend DX |

---

### Sprint 2 Retrospective

| Category | Notes |
|---|---|
| ✅ What went well | Backend delivery was strong and on schedule; approval workflow tested end-to-end cleanly; vendor dropdown worked immediately |
| ❌ What to improve | UI styling was inconsistent across pages — different spacing, font sizes, button styles; no shared component system |
| 🔧 Action item | Create shared CSS variables and reusable React components (Button, Table, StatusBadge) in Sprint 3 |

---

### Sprint 3 Retrospective

| Category | Notes |
|---|---|
| ✅ What went well | All stories completed; procure-to-pay cycle fully working end-to-end; shared components resolved Sprint 2 UI debt |
| ❌ What to improve | Backend service layer has no unit tests; any refactor risks silent regressions |
| 🔧 Action item | Dedicate 25% of Sprint 4 capacity to writing JUnit tests for service classes |

---

### Sprint 4 Retrospective (Draft — to be finalized)

| Category | Notes |
|---|---|
| ✅ What went well | Reports backend progressing; deployment scripts clean; agile docs completed |
| ❌ What to improve | Reports dashboard story was underestimated — charting library integration took longer than expected |
| 🔧 Action item | Break large frontend stories involving third-party libraries into separate spike + implementation tasks next cycle |

---

## 9. Burndown Summary

| Sprint | Points Planned | Points Completed | Velocity |
|---|---|---|---|
| Sprint 1 | 24 | 27 | 27 |
| Sprint 2 | 27 | 38 | 38 |
| Sprint 3 | 35 | 27 | 27 |
| Sprint 4 | 30 | 25 (ongoing) | TBD |
| **Total** | **116** | **117+** | |

**Cumulative Story Points Completed:** 117 (across Sprints 1–4)  
**Average Team Velocity:** ~30 points/sprint

---

*Document maintained by Group 2 — last updated April 2026*
