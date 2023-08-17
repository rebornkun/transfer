import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const InputText = ({ color, id }) => {
  const {
    runForex,
    updateRecieverAmount,
    updateSenderAmount,
    receiverAmount,
    senderAmount,
  } = useAppContext();
  const [state, setState] = useState();
  const activateEdit = (e) => {
    e.preventDefault();
    setState("edit");
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      let classes = e?.target?.classList?.value;
      if (classes.includes(`edittrigger${id}`)) {
        setState("edit");
      } else {
        setState("display");
      }
    });
  }, []);

  useEffect(() => {
    if (state === "display") {
      runForex(id);
    }
  }, [state]);

  return (
    <div className="w-1/2">
      {state === "edit" ? (
        <input
          type="number"
          className={`edittrigger${id} edittrigger text-end text-[2rem] font-[600] w-full`}
          value={id === 1 ? senderAmount : receiverAmount}
          onClick={activateEdit}
          onChange={(e) => {
            e.preventDefault();
            if (id === 1) {
              updateSenderAmount(Number(e.target.value));
            } else {
              updateRecieverAmount(Number(e.target.value));
            }
          }}
          style={{ color: color }}
        />
      ) : (
        <p
          onClick={activateEdit}
          className={`edittrigger${id} edittrigger text-[2rem] font-[600] text-end`}
          style={{ color: color }}
        >
          {id === 1
            ? Number(Number(senderAmount).toFixed(2)).toLocaleString(2)
            : Number(Number(receiverAmount).toFixed(2)).toLocaleString(2)}
        </p>
      )}
    </div>
  );
};

export default InputText;
