import { CSSProperties } from "react";

export const calendarStyles = {
  container: {
    flex: 2,
    background: "#fff",
    padding: "20px",
  },
  header: {
    wrapper: {
      display: "flex",
      justifyContent: "space-between",
      padding: "40px 0 60px",
      alignItems: "center",
      userSelect: "none",
    } as CSSProperties,
    icon: {
      fontSize: "16px",
      cursor: "pointer",
    } as CSSProperties,
    title: {
      fontSize: "16px",
      fontWeight: "bold",
    } as CSSProperties,
  },
  todoList: {
    list: {
      listStyle: "none",
      padding: 0,
    },
    item: {
      wrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "4px",
      },
      content: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
      },
      deleteIcon: {
        cursor: "pointer",
        color: "#ff4d4f",
      },
    },
  },
};
