import { Admin, Resource, defaultTheme } from "react-admin";
import dataProvider from "../services/dataProvider";
import ShopsList from "../components/Admin/ShopsList";
import ShopsEdit from "../components/Admin/ShopsEdit";
import ShopsCreate from "../components/Admin/ShopsCreate";

const myTheme = {
  ...defaultTheme,
  palette: {
    secondary: { main: "#D1CCC7" },
    primary: { main: "#928e8b" },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
};

export default function AdminPanel() {
  return (
    <Admin basename="/admin" dataProvider={dataProvider} theme={myTheme}>
      <Resource
        name="shops"
        list={ShopsList}
        edit={ShopsEdit}
        create={ShopsCreate}
      />
    </Admin>
  );
}
