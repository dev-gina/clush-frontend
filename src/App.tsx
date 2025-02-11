import { ConfigProvider, Layout } from "antd";
import { TodoProvider } from "./contexts/TodoContext"; 
import CalendarView from "./components/CalendarView";

const { Header, Content } = Layout;

function App() {
  return (
    <ConfigProvider>
      <TodoProvider>
        <Layout style={{ minHeight: "100vh" }}>
          <Header style={{ background: "#fff", padding: "0 20px" }}>
            <h1>Todo Calendar</h1>
          </Header>
          <Content style={{ padding: "20px", display: "flex", gap: "20px" }}>
            <CalendarView />  
          </Content>
        </Layout>
      </TodoProvider>
    </ConfigProvider>
  );
}

export default App;
