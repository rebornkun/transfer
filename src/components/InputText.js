import { useEffect, useState } from "react";

const InputText = ({ color, id }) => {
  const [state, setState] = useState();
  const [value, setValue] = useState(0);
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
  console.log(state);

  return (
    <div className="w-1/2">
      {state === "edit" ? (
        <input
          type="number"
          className={`edittrigger${id} edittrigger text-end text-[2rem] font-[600] w-full`}
          value={value}
          onClick={activateEdit}
          onChange={(e) => {
            e.preventDefault();
            setValue(e.target.value);
          }}
          style={{ color: color }}
        />
      ) : (
        <p
          onClick={activateEdit}
          className={`edittrigger${id} edittrigger text-[2rem] font-[600] text-end`}
          style={{ color: color }}
        >
          {Number(value).toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default InputText;
