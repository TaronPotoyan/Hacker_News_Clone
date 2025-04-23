export function Validation_pass(req, res, next) {
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ 
            valid: false, 
            message: "Password is required." 
        });
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-]).{8,}$/;
    const passwordStr = String(password);
    
    if (!regex.test(passwordStr)) {
        return res.status(400).json({ 
            valid: false, 
            message: "Password must be at least 8 characters long, include at least: one uppercase letter, one lowercase letter, one number, and one special character." 
        });
    }
    
    next();
}

export function Validation_name(req, res, next) {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ 
            valid: false, 
            message: "Name is required." 
        });
    }

    const regex = /^[a-zA-Z]{3,30}$/;
    const nameStr = String(name);
    
    if (!regex.test(nameStr)) {
        return res.status(400).json({ 
            valid: false, 
            message: "Name must be between 3 and 30 characters long and contain only letters." 
        });
    }
    
    next();
}