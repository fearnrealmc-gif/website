import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../i18n';

interface LoginPageProps {
  onLoginSuccess: () => void;
  isAuthenticated: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, isAuthenticated }) => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const correctPassword = 'Modelhs2024';

  useEffect(() => {
    document.title = t('title_admin_login');
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setError('');
      onLoginSuccess();
      navigate('/admin');
    } else {
      setError(t('admin_login_error'));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] bg-neutral-light dark:bg-neutral-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div>
          <h2 className="text-3xl font-extrabold text-center text-primary dark:text-white">
            {t('admin_login_title')}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="password-input" className="sr-only">{t('admin_login_password')}</label>
              <input
                id="password-input"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                placeholder={t('admin_login_password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!error}
                aria-describedby="password-error"
              />
            </div>
          </div>
          
          {error && <p id="password-error" className="text-sm text-center text-red-500">{error}</p>}

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-3 text-lg font-medium text-white border border-transparent rounded-md group bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              {t('admin_login_button')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
