import {
  BusinessCenterOutlined,
  PeopleOutline,
  AccountBalanceOutlined,
  AccountBoxOutlined,
  AdminPanelSettingsOutlined,
  EventNoteOutlined,
  MoneyOffCsredOutlined,
  WorkOutline,
  SecurityOutlined,
  AssignmentIndOutlined,
} from "@mui/icons-material";

export const CategoriesJSON = {
  personel: {
    CategoryTitle: "Personel",
    SubCategories: [
      {
        subCategoryTitle: "İnsan Kaynakları",
        icon: <PeopleOutline />,
        urlPath: "/personel/personel-hr",
        id: "personel-hr",
      },
      {
        subCategoryTitle: "Finans",
        icon: <AccountBalanceOutlined />,
        urlPath: "/personel/personel-finance",
        id: "personel-finance",
      },
      {
        subCategoryTitle: "Pazarlama",
        icon: <BusinessCenterOutlined />,
        urlPath: "/personel/personel-marketing",
        id: "personel-marketing",
      },
      {
        subCategoryTitle: "IT Departmanı",
        icon: <SecurityOutlined />,
        urlPath: "/personel/personel-it",
        id: "personel-it",
      },
      {
        subCategoryTitle: "Operasyon",
        icon: <WorkOutline />,
        urlPath: "/personel/personel-operations",
        id: "personel-operations",
      },
    ],
  },
  offical: {
    CategoryTitle: "Yetkili",
    SubCategories: [
      {
        subCategoryTitle: "CEO",
        icon: <AccountBoxOutlined />,
        urlPath: "/offical/offical-ceo",
        id: "offical-ceo",
      },
      {
        subCategoryTitle: "Yönetici",
        icon: <AdminPanelSettingsOutlined />,
        urlPath: "/offical/offical-manager",
        id: "offical-manager",
      },
      {
        subCategoryTitle: "Finans Müdürü",
        icon: <MoneyOffCsredOutlined />,
        urlPath: "/offical/offical-finance-manager",
        id: "offical-finance-manager",
      },
      {
        subCategoryTitle: "Pazarlama Müdürü",
        icon: <BusinessCenterOutlined />,
        urlPath: "/offical/offical-marketing-manager",
        id: "offical-marketing-manager",
      },
      {
        subCategoryTitle: "İnsan Kaynakları Müdürü",
        icon: <AssignmentIndOutlined />,
        urlPath: "/offical/offical-hr-manager",
        id: "offical-hr-manager",
      },
    ],
  },
};
