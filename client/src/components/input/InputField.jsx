export default function InputField({ label, type, name, value, placeholder, textarea, acceptFileType, onChange = null}) {
  return (
    <div className="form-group">
      <label>{label}</label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          accept={acceptFileType}  
        />
      )}
    </div>
  );
}
