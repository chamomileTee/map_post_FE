import styles from './SignUp.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        id: '',
        password: '',
        confirmPassword: ''
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState, //기존 상태 복사
            [name]: value //새로운 값 업데이트
        }))
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //submit 시 페이지 새로고침 방지, 데이터 처리 가능하도록

        if (formData.password !== formData.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await fetch('BE_API_URL/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    id: formData.id,
                    password: formData.password
                })
            });

            if (response.ok) {
                alert('회원가입이 완료되었습니다.');
                window.location.href = '/login';
            } else {
                const errorData = await response.json();
                alert(errorData.message || '회원가입에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('서버 오류가 발생했습니다.');
        }
    };

    return  (
        <div className={styles.pageWrapper}>
            <div className={styles.signUpContainer}>
                <h1 className={styles.title}>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <input
                            type="email"
                            name="email"
                            className={styles.input}
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            name="id"
                            className={styles.input}
                            placeholder="Enter your ID"
                            value={formData.id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="password"
                            name="password"
                            className={styles.input}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="password"
                            name="confirmPassword"
                            className={styles.input}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.button}>
                        Sign Up
                    </button>
                </form>
                <div className={styles.loginLink}>
                    <Link to="/login">Back to Sign In</Link>
                </div>
            </div>
        </div>
    )
}
  
export default SignUp;