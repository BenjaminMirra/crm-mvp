import { Tabs, Tab } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_TABS = [
  { label: "Home", path: "/" },
  { label: "Ventas", path: "/ventas" },
  { label: "Gastos", path: "/gastos" },
];

export default function NavigationTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = NAV_TABS.findIndex(tab => tab.path === location.pathname) !== -1
    ? NAV_TABS.findIndex(tab => tab.path === location.pathname)
    : 0;

  return (
    <Tabs
      value={currentTab}
      onChange={(_, idx) => navigate(NAV_TABS[idx].path)}
      textColor="inherit"
      indicatorColor="secondary"
    >
      {NAV_TABS.map(tab => (
        <Tab key={tab.path} label={tab.label} />
      ))}
    </Tabs>
  );
}
