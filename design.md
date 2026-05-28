# Design Document: Statement of Work Template Generator

## 1. Summary

The proposed app generates pre-populated Statement of Work (SoW) documents from project records stored in SharePoint. Instead of starting from a blank template and manually copying project details into each document, users request a document and receive a draft with known fields already filled in, reducing errors, improving consistency, and saving time.

The solution should prioritize open document formats such as ODT where practical, while supporting DOCX during transition to fit current Microsoft 365 workflows.

## 2. Problem Statement

Current SoW creation is manual and repetitive:

- users begin from blank templates
- common project fields must be retyped or copied repeatedly
- formatting varies between users, especially for dates and names
- manual entry introduces avoidable errors and inconsistencies

Although the required information already exists in SharePoint or related Microsoft 365 systems, it is not reused automatically when generating project documents.

## 3. Goals

The app should:

1. Generate SoW templates pre-filled from SharePoint project data.
2. Standardize formatting for dates, customer names, document numbers, and other shared fields.
3. Reduce manual copying and data-entry mistakes.
4. Support a controlled template library for different document types.
5. Prefer open formats (ODT) while allowing DOCX/PDF output as needed.
6. Fit naturally into the Microsoft ecosystem used by staff.

## 4. Non-Goals

The first version will not:

- replace SharePoint as the master source of project data
- fully automate legal/commercial authoring of bespoke SoW text
- implement full document lifecycle approval unless already required
- migrate all historic documents into open formats immediately

## 5. Users

- **Primary users:** project managers, delivery managers, bid teams, PMO staff
- **Secondary users:** reviewers, approvers, document control/admin teams
- **System owners:** IT / business applications team

## 6. User Journey

1. User opens a project record in SharePoint.
2. User selects **Generate Statement of Work**.
3. App retrieves project metadata and customer details from SharePoint.
4. User chooses a template type/version if needed.
5. App generates a draft document with known fields pre-populated.
6. User reviews, edits project-specific narrative sections, and saves/export the result.
7. Final document is stored back to SharePoint with correct metadata.

## 7. Functional Requirements

### 7.1 Data Retrieval

The app must retrieve, at minimum:

- document number / project reference
- project name
- customer name
- customer contact details
- project manager / owner
- project dates
- commercial metadata where available
- version / revision information

### 7.2 Template Population

The app must:

- map SharePoint fields to document placeholders
- apply standard formatting rules
- support required/optional fields
- flag missing mandatory data before generation
- support multiple SoW templates

### 7.3 Document Output

The app should support:

- **ODT** as preferred editable output
- **DOCX** as transitional/editable output
- **PDF** for distribution/final issue

### 7.4 Validation and Consistency

The app must:

- enforce standard date formats
- validate key identifiers before generation
- prevent inconsistent field naming across documents
- maintain template version control

### 7.5 Storage and Audit

The app should:

- save generated documents back into SharePoint
- attach metadata to generated files
- record who generated the document and when
- keep an audit trail of template version used

## 8. Proposed Solution

### 8.1 High-Level Architecture

**Frontend**
- Web app embedded in or linked from SharePoint
- Form for template selection, preview, and missing-field confirmation

**Backend**
- Service that reads SharePoint project metadata
- Mapping engine that transforms source data into document fields
- Document generation engine for ODT/DOCX/PDF output

**Storage / Source Systems**
- SharePoint lists/libraries as system of record for project metadata
- Template repository stored in SharePoint or controlled app storage

### 8.2 Microsoft Stack Option

A Microsoft-native implementation could use:

- **SharePoint Online** for project records and document storage
- **Microsoft Graph API** for data access
- **Power Automate** for orchestration or triggers
- **Power Apps** or a lightweight web app for user interaction
- **Azure Functions / App Service** for document generation logic

This approach keeps the solution aligned with current tooling and permissions.

### 8.3 Open Format Strategy

Because UK Government guidance favors open formats, the system should be designed with format abstraction:

- templates defined independently from business logic
- field mapping separated from rendering engine
- output renderer able to target ODT first, with DOCX fallback

This avoids locking the design to a proprietary format and allows gradual migration.

## 9. Data Model

Example core fields:

| Field | Source | Example |
|---|---|---|
| Project ID | SharePoint | PRJ-1042 |
| Document Number | SharePoint / generated | SOW-1042-01 |
| Project Name | SharePoint | Network Upgrade |
| Customer Name | SharePoint | ABC Council |
| Customer Contact | SharePoint | Jane Smith |
| Project Manager | SharePoint | John Brown |
| Start Date | SharePoint | 2026-06-01 |
| End Date | SharePoint | 2026-09-30 |
| Template Version | Template repository | v1.3 |

## 10. Key Design Decisions

### 10.1 Source of Truth

SharePoint remains the source of truth for project metadata.

### 10.2 Missing Data Handling

If required fields are missing, the app should block generation or clearly mark unresolved placeholders rather than silently guessing.

### 10.3 Template Governance

Templates must be centrally managed, versioned, and approved to avoid teams using inconsistent local copies.

### 10.4 Format Support

Support both ODT and DOCX initially, with ODT as the strategic target and DOCX retained for compatibility during rollout.

## 11. Non-Functional Requirements

- **Security:** respect Microsoft 365 permissions; users only generate documents for projects they can access
- **Reliability:** generation should succeed consistently with clear error messages
- **Performance:** draft generation should normally complete within a few seconds
- **Maintainability:** field mappings and templates must be updateable without major code changes
- **Auditability:** every generated document should be traceable to source data and template version

## 12. Risks and Constraints

- SharePoint data quality may be inconsistent or incomplete
- ODT support may require different tooling than standard Microsoft document generation flows
- Some current templates may depend on Word-specific formatting features
- Users may resist process changes unless the generated drafts are clearly better than manual methods

## 13. MVP Scope

The first release should include:

1. One SharePoint project source
2. One SoW template type
3. Pre-population of core project and customer metadata
4. Standardized formatting rules
5. Output to DOCX and PDF, with ODT piloted if feasible
6. Save-back to SharePoint with audit metadata

## 14. Future Enhancements

- support for additional document types beyond SoW
- clause libraries and conditional content insertion
- AI-assisted drafting of project-specific sections
- approval workflow integration
- digital signatures
- broader open-document workflow support

## 15. Success Measures

The project is successful if it delivers:

- reduced time to produce first-draft SoW documents
- fewer data-entry errors
- improved consistency across teams
- increased reuse of SharePoint project metadata
- measurable reduction in blank-template usage
