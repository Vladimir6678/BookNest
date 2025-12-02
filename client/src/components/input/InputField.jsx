export default function InputField({ label, type, name, value, onChange, placeholder }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}