import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SecuritySettings = ({ userData, onDataChange }) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [backupCodes, setBackupCodes] = useState([]);
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  const activeSessions = [
    {
      id: 1,
      device: 'MacBook Pro',
      browser: 'Chrome 120.0',
      location: 'New York, NY',
      ipAddress: '192.168.1.100',
      lastActive: '2024-01-15T10:30:00Z',
      current: true
    },
    {
      id: 2,
      device: 'iPhone 15 Pro',
      browser: 'Safari Mobile',
      location: 'New York, NY',
      ipAddress: '192.168.1.101',
      lastActive: '2024-01-15T09:15:00Z',
      current: false
    },
    {
      id: 3,
      device: 'Windows PC',
      browser: 'Edge 120.0',
      location: 'Boston, MA',
      ipAddress: '10.0.0.50',
      lastActive: '2024-01-14T16:45:00Z',
      current: false
    }
  ];

  const loginHistory = [
    {
      id: 1,
      timestamp: '2024-01-15T10:30:00Z',
      device: 'MacBook Pro',
      location: 'New York, NY',
      ipAddress: '192.168.1.100',
      status: 'success'
    },
    {
      id: 2,
      timestamp: '2024-01-15T09:15:00Z',
      device: 'iPhone 15 Pro',
      location: 'New York, NY',
      ipAddress: '192.168.1.101',
      status: 'success'
    },
    {
      id: 3,
      timestamp: '2024-01-14T22:30:00Z',
      device: 'Unknown Device',
      location: 'Los Angeles, CA',
      ipAddress: '203.0.113.1',
      status: 'blocked'
    },
    {
      id: 4,
      timestamp: '2024-01-14T16:45:00Z',
      device: 'Windows PC',
      location: 'Boston, MA',
      ipAddress: '10.0.0.50',
      status: 'success'
    }
  ];

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordSubmit = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    // Handle password change
    console.log('Password change requested');
    setShowPasswordModal(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleEnable2FA = () => {
    const codes = Array.from({ length: 8 }, () => 
      Math.random().toString(36).substring(2, 8).toUpperCase()
    );
    setBackupCodes(codes);
    setTwoFactorEnabled(true);
    setShowBackupCodes(true);
    setShow2FAModal(false);
    onDataChange({ twoFactorEnabled: true });
  };

  const handleDisable2FA = () => {
    setTwoFactorEnabled(false);
    setBackupCodes([]);
    onDataChange({ twoFactorEnabled: false });
  };

  const handleTerminateSession = (sessionId) => {
    console.log('Terminating session:', sessionId);
  };

  const getDeviceIcon = (device) => {
    if (device.includes('iPhone') || device.includes('Android')) return 'Smartphone';
    if (device.includes('iPad') || device.includes('Tablet')) return 'Tablet';
    if (device.includes('Mac')) return 'Monitor';
    return 'Laptop';
  };

  const formatLastActive = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Active now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-8">
      {/* Security Overview */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Security Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-surface/50 rounded-lg">
            <Icon name="Shield" size={32} className="text-success mx-auto mb-2" />
            <div className="text-lg font-semibold text-text-primary">Strong</div>
            <div className="text-sm text-text-secondary">Password Security</div>
          </div>
          <div className="text-center p-4 bg-surface/50 rounded-lg">
            <Icon name={twoFactorEnabled ? "ShieldCheck" : "ShieldAlert"} size={32} className={`mx-auto mb-2 ${twoFactorEnabled ? 'text-success' : 'text-warning'}`} />
            <div className="text-lg font-semibold text-text-primary">
              {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </div>
            <div className="text-sm text-text-secondary">Two-Factor Auth</div>
          </div>
          <div className="text-center p-4 bg-surface/50 rounded-lg">
            <Icon name="Activity" size={32} className="text-primary mx-auto mb-2" />
            <div className="text-lg font-semibold text-text-primary">{activeSessions.length}</div>
            <div className="text-sm text-text-secondary">Active Sessions</div>
          </div>
        </div>
      </div>

      {/* Password Settings */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Password & Authentication</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface/30 rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">Password</h4>
              <p className="text-sm text-text-secondary">Last changed 3 months ago</p>
            </div>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
            >
              Change Password
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface/30 rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">Two-Factor Authentication</h4>
              <p className="text-sm text-text-secondary">
                {twoFactorEnabled ? 'Protect your account with 2FA' : 'Add an extra layer of security'}
              </p>
            </div>
            <button
              onClick={() => twoFactorEnabled ? handleDisable2FA() : setShow2FAModal(true)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                twoFactorEnabled
                  ? 'bg-error text-white hover:bg-error/80' :'bg-success text-white hover:bg-success/80'
              }`}
            >
              {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </button>
          </div>

          {twoFactorEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-4 bg-success/10 border border-success/20 rounded-lg"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="ShieldCheck" size={16} className="text-success" />
                <span className="font-medium text-success">Two-Factor Authentication Enabled</span>
              </div>
              <p className="text-sm text-text-secondary mb-3">
                Your account is protected with two-factor authentication.
              </p>
              <button
                onClick={() => setShowBackupCodes(true)}
                className="text-sm text-primary hover:text-primary/80"
              >
                View Backup Codes
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Active Sessions */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Active Sessions</h3>
        
        <div className="space-y-4">
          {activeSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-surface/30 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={getDeviceIcon(session.device)} size={20} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-text-primary">{session.device}</h4>
                    {session.current && (
                      <span className="px-2 py-1 bg-success/20 text-success text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary">{session.browser}</p>
                  <p className="text-sm text-text-secondary">
                    {session.location} • {session.ipAddress}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {formatLastActive(session.lastActive)}
                  </p>
                </div>
              </div>
              {!session.current && (
                <button
                  onClick={() => handleTerminateSession(session.id)}
                  className="px-3 py-1 text-error hover:bg-error/10 rounded-lg transition-colors text-sm"
                >
                  Terminate
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Login History */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Recent Login Activity</h3>
        
        <div className="space-y-3">
          {loginHistory.map((login) => (
            <div key={login.id} className="flex items-center justify-between p-3 bg-surface/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  login.status === 'success' ? 'bg-success' : 
                  login.status === 'blocked' ? 'bg-error' : 'bg-warning'
                }`} />
                <div>
                  <div className="text-sm text-text-primary">
                    {new Date(login.timestamp).toLocaleString()}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {login.device} • {login.location} • {login.ipAddress}
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                login.status === 'success' ? 'bg-success/20 text-success' :
                login.status === 'blocked'? 'bg-error/20 text-error' : 'bg-warning/20 text-warning'
              }`}>
                {login.status.charAt(0).toUpperCase() + login.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-1000 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 rounded-lg max-w-md w-full"
          >
            <h3 className="text-xl font-semibold text-text-primary mb-6">Change Password</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  className="w-full px-3 py-2 bg-surface border border-glass-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  placeholder="Enter current password"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  className="w-full px-3 py-2 bg-surface border border-glass-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  placeholder="Enter new password"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  className="w-full px-3 py-2 bg-surface border border-glass-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 px-4 py-2 bg-surface text-text-primary rounded-lg hover:bg-surface/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
              >
                Update Password
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 2FA Setup Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 z-1000 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 rounded-lg max-w-md w-full"
          >
            <h3 className="text-xl font-semibold text-text-primary mb-6">Enable Two-Factor Authentication</h3>
            
            <div className="text-center mb-6">
              <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                <div className="text-xs text-gray-800">QR Code Placeholder</div>
              </div>
              <p className="text-sm text-text-secondary">
                Scan this QR code with your authenticator app or enter the setup key manually.
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Setup Key
              </label>
              <div className="p-3 bg-surface border border-glass-border rounded-lg font-mono text-sm text-text-primary">
                JBSWY3DPEHPK3PXP
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Verification Code
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-surface border border-glass-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                placeholder="Enter 6-digit code"
                maxLength={6}
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShow2FAModal(false)}
                className="flex-1 px-4 py-2 bg-surface text-text-primary rounded-lg hover:bg-surface/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEnable2FA}
                className="flex-1 px-4 py-2 bg-success text-white rounded-lg hover:bg-success/80 transition-colors"
              >
                Enable 2FA
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Backup Codes Modal */}
      {showBackupCodes && (
        <div className="fixed inset-0 z-1000 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 rounded-lg max-w-md w-full"
          >
            <h3 className="text-xl font-semibold text-text-primary mb-6">Backup Codes</h3>
            
            <p className="text-sm text-text-secondary mb-4">
              Save these backup codes in a safe place. You can use them to access your account if you lose your authenticator device.
            </p>

            <div className="grid grid-cols-2 gap-2 mb-6">
              {backupCodes.map((code, index) => (
                <div key={index} className="p-2 bg-surface border border-glass-border rounded font-mono text-sm text-text-primary text-center">
                  {code}
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowBackupCodes(false)}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
              >
                I've Saved These Codes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SecuritySettings;