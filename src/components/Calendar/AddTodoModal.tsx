import { Modal, Form, Input } from "antd";
import type { AddTodoModalProps } from "./types";

export const AddTodoModal = ({
  isOpen,
  selectedDate,
  onOk,
  onCancel,
}: AddTodoModalProps) => (
  <Modal
    title={`일정 추가 - ${selectedDate?.format("YYYY년 MM월 DD일")}`}
    open={isOpen}
    onOk={() => onOk({ title: "" })}
    onCancel={onCancel}
    okText="추가"
    cancelText="취소"
  >
    <Form onFinish={onOk}>
      <Form.Item
        name="title"
        rules={[{ required: true, message: "일정 내용을 입력해주세요" }]}
      >
        <Input placeholder="일정 내용을 입력하세요" />
      </Form.Item>
    </Form>
  </Modal>
);
