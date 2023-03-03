export default function InputField({ settings, state, }) {
    // safeguard
    if (settings === undefined) throw new Error("The setting prop is missing");
    if (state === undefined) throw new Error("The state prop is missing");

    const { label, type, placeholder, required, autoFocus, accept } = settings;
    const [getter, setter] = state;

    // function onValidate(callback, setState) {
    //     // Safeguard
    //     if (callback === undefined) return setState("0");
    //     const result = callback(getter,list);
    //     console.log(result.data);
    //     setState(result.data);
    // }

    return (
        <label className="input_field">
            {label}
            {type !== 'file' &&
                <input
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    autoFocus={autoFocus}
                    value={getter}
                    onChange={(event) => setter(event.target.value)}
                />
            }
            {type === 'file' &&
                <input
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    autoFocus={autoFocus}
                    accept={accept}
                    onChange={(event) => setter(event.target.files[0])}
                />
            }
        </label>
    );
}