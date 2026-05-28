import { buildTemplateSegments, replaceTemplatePlaceholders, type TemplateData } from "@/app/utils/templateEngine";

export type ProjectStatus = "Active" | "Drafting" | "Missing Data";

export type ProjectSummary = {
  id: string;
  name: string;
  customer: string;
  projectManager: {
    name: string;
    initials: string;
  };
  targetDate: string;
  status: ProjectStatus;
};

export type MappingRow = {
  field: string;
  placeholder: string;
  value: string;
  missing?: boolean;
  error?: string;
};

export type ActivityItem = {
  timestamp: string;
  action: string;
};

export const PROJECTS: ProjectSummary[] = [
  {
    id: "PRJ-2024-001",
    name: "Project Alpha Implementation",
    customer: "Northwind Holdings",
    projectManager: { name: "Sarah Wong", initials: "SW" },
    targetDate: "2024-09-30",
    status: "Drafting",
  },
  {
    id: "PRJ-1042",
    name: "Network Infrastructure Upgrade",
    customer: "ABC Council",
    projectManager: { name: "Jane Doe", initials: "JD" },
    targetDate: "2023-11-15",
    status: "Active",
  },
  {
    id: "PRJ-1088",
    name: "Cloud Migration Assessment",
    customer: "Global Tech Partners",
    projectManager: { name: "Mark Smith", initials: "MS" },
    targetDate: "2023-12-01",
    status: "Drafting",
  },
  {
    id: "PRJ-0995",
    name: "Security Audit & Compliance",
    customer: "Department of Health",
    projectManager: { name: "Jane Doe", initials: "JD" },
    targetDate: "2023-10-30",
    status: "Missing Data",
  },
  {
    id: "PRJ-1124",
    name: "Digital Records Modernisation",
    customer: "CityWorks Agency",
    projectManager: { name: "Amir Khan", initials: "AK" },
    targetDate: "2024-01-18",
    status: "Active",
  },
  {
    id: "PRJ-1177",
    name: "Endpoint Management Rollout",
    customer: "Crown Manufacturing",
    projectManager: { name: "Priya Patel", initials: "PP" },
    targetDate: "2024-02-05",
    status: "Active",
  },
  {
    id: "PRJ-1201",
    name: "Customer Portal Redevelopment",
    customer: "Bluewater Utilities",
    projectManager: { name: "Leon Grant", initials: "LG" },
    targetDate: "2024-03-14",
    status: "Drafting",
  },
  {
    id: "PRJ-1219",
    name: "Data Lake Readiness Review",
    customer: "Insight Retail Group",
    projectManager: { name: "Nina Hart", initials: "NH" },
    targetDate: "2024-04-09",
    status: "Missing Data",
  },
  {
    id: "PRJ-1248",
    name: "Unified Communications Refresh",
    customer: "Silverline Energy",
    projectManager: { name: "Tom Reyes", initials: "TR" },
    targetDate: "2024-05-21",
    status: "Active",
  },
];

export const PROJECT_TOTAL_COUNT = 24;
export const PAGE_SIZE = 3;

export const DASHBOARD_STATS = [
  {
    title: "Total Active Contexts",
    value: "24",
    detail: "+3 this week",
  },
  {
    title: "Pending Drafts",
    value: "7",
    detail: "awaiting review",
  },
  {
    title: "Quick Generate",
    value: "Create a pre-filled SoW",
    detail: "Use the latest template and mapped project metadata.",
    cta: "Generate Draft",
  },
] as const;

export const TEMPLATE_NAME = "Standard SoW v1.3";
export const TEMPLATE_VERSION = "Standard Enterprise Software Delivery v2.1";

export const SOW_TEMPLATE = `STATEMENT OF WORK
For {{Customer_Name}}

1. PROJECT OVERVIEW
This Statement of Work ("SOW") is entered into by and between {{Provider_Name}} ("Provider") and {{Customer_Name}} ("Client"), effective as of {{Commencement_Date}}.

The purpose of this project is to {{Project_Description}}.

2. SCOPE OF SERVICES
Provider will perform the following services (the "Services"):
- Phase 1 - Discovery: {{Phase1_Description}}
- Phase 2 - Implementation: {{Phase2_Description}}
- Phase 3 - Training: {{Phase3_Description}}

3. PAYMENT TERMS
Total contract value: {{Contract_Value}}
`;

export const TEMPLATE_MAPPING_ROWS: MappingRow[] = [
  {
    field: "Project Name",
    placeholder: "{{Project_Name}}",
    value: "Project Alpha Implementation",
  },
  {
    field: "Customer ID",
    placeholder: "{{Customer_Name}}",
    value: "Northwind Holdings",
  },
  {
    field: "Start Date",
    placeholder: "{{Commencement_Date}}",
    value: "Mandatory field empty in SharePoint.",
    missing: true,
    error: "Mandatory field empty in SharePoint.",
  },
  {
    field: "Total Value",
    placeholder: "{{Contract_Value}}",
    value: "$185,000",
  },
];

const baseProjectData: Record<string, TemplateData> = {
  "PRJ-2024-001": {
    Project_Name: "Project Alpha Implementation",
    Customer_Name: "Northwind Holdings",
    Provider_Name: "Enterprise Delivery Group",
    Commencement_Date: "2024-08-01",
    Project_Description: "deliver a phased enterprise software implementation across operations and finance teams",
    Phase1_Description: "validate business goals, interfaces, and reporting needs",
    Phase2_Description: "configure the platform, migrate data, and deploy core workflows",
    Phase3_Description: "train key users, complete hypercare support, and hand over documentation",
    Contract_Value: "$185,000",
  },
  "PRJ-1042": {
    Project_Name: "Network Infrastructure Upgrade",
    Customer_Name: "ABC Council",
    Provider_Name: "Enterprise Delivery Group",
    Commencement_Date: "2023-10-01",
    Project_Description: "upgrade network resilience across civic offices and data rooms",
    Phase1_Description: "survey existing switches and routing topology",
    Phase2_Description: "replace end-of-life hardware and implement resilient WAN design",
    Phase3_Description: "deliver knowledge transfer and runbooks to support teams",
    Contract_Value: "$260,000",
  },
};

const defaultProjectData: TemplateData = {
  Project_Name: "Strategic Delivery Programme",
  Customer_Name: "Contoso Ltd",
  Provider_Name: "Enterprise Delivery Group",
  Commencement_Date: "2024-07-15",
  Project_Description: "deliver a structured consulting engagement with measurable outcomes",
  Phase1_Description: "confirm scope, dependencies, and governance",
  Phase2_Description: "execute the implementation plan and quality checkpoints",
  Phase3_Description: "transition ownership and train operational users",
  Contract_Value: "$145,000",
};

export const RECENT_ACTIVITY: ActivityItem[] = [
  { timestamp: "09:42", action: "Auto-save completed for latest SOW draft" },
  { timestamp: "09:31", action: "Validation passed for all required placeholders" },
  { timestamp: "09:18", action: "Project data refreshed from SharePoint mirror" },
];

export function getProjectById(id: string): ProjectSummary {
  return PROJECTS.find((project) => project.id === id) ?? PROJECTS[0];
}

export function getProjectTemplateData(id: string): TemplateData {
  const project = getProjectById(id);
  return {
    ...defaultProjectData,
    ...baseProjectData[id],
    Project_Name: baseProjectData[id]?.Project_Name ?? project.name,
    Customer_Name: baseProjectData[id]?.Customer_Name ?? project.customer,
  };
}

export function getTemplateConfigPreview() {
  return buildTemplateSegments(SOW_TEMPLATE, {
    Project_Name: "Project Alpha Implementation",
    Customer_Name: "Northwind Holdings",
    Provider_Name: "Enterprise Delivery Group",
    Commencement_Date: "",
    Project_Description: "deliver a controlled implementation with shared governance and reporting",
    Phase1_Description: "confirm scope and target architecture",
    Phase2_Description: "configure the platform and complete deployment",
    Phase3_Description: "train stakeholders and transfer service ownership",
    Contract_Value: "$185,000",
  });
}

export function getProjectDocument(id: string) {
  const project = getProjectById(id);
  const data = getProjectTemplateData(id);
  const document = replaceTemplatePlaceholders(SOW_TEMPLATE, data);

  return {
    project,
    data,
    document,
    title: `Statement of Work: ${project.name}`,
    subtitle: `Template: ${TEMPLATE_VERSION}`,
    segments: buildTemplateSegments(SOW_TEMPLATE, data),
    validation: {
      completed: 24,
      total: 24,
      percentage: 100,
    },
  };
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
