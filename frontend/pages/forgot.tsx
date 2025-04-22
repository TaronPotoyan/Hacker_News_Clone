
export default function Forgot() {
    return (
        <div className="forgot-container">
            <h2>Forgot Password</h2>
            <p>Please enter your email to reset your password.</p>
            <input type="email" placeholder="Email address" className="inp" />
            <button className="logbtn">Send Reset Link</button>
        </div>
    );
}
