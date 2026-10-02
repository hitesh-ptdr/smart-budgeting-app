export default function Register() {
  return (
    <div className="auth-container">
      <h2>Register</h2> 

      <form>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="password" required />

        <button type="submit">Create Account</button>
      </form>
    </div>
  ); 
}