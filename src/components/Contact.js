import { Modal } from "antd";

const Contact = ({ show, handleOk, handleCancel }) => {
  return (
    <Modal
      title="Contact Us"
      open={show}
      onCancel={handleCancel}
      className="modal h-[90%] w-[90%]"
      wrapClassName="contact_modal"
    >
      <p className="">
        Our English Customer Support team is here Monday through Friday, 07:00 -
        18:00 (GMT).
      </p>
      <p className="mt-2">
        Email Us: <a href="mailto:hello@transfergo.com">hello@transfergo.cc</a>
      </p>
      <p className="mt-2">Call Us: UK +44 7418361695</p>
    </Modal>
  );
};

export default Contact;
