# 🔒 Security Notice

**IMPORTANT**: Sensitive files are now protected from being committed to Git.

## 🚨 Files Removed from Tracking:
- All `.env` files (contain database passwords and secrets)
- MongoDB connection strings
- API keys and JWT secrets
- Upload directories with user images

## 🛡️ Protected Information:
- **MongoDB URI**: Contains database username/password
- **JWT_SECRET**: Used for user authentication
- **API Keys**: Third-party service credentials
- **User uploads**: Personal images and files

## ⚙️ Setup for New Developers:

1. **Copy environment templates**:
   ```bash
   cp backend/.env.example backend/.env
   cp tour-guide/.env.example tour-guide/.env
   ```

2. **Add your own credentials**:
   - Get MongoDB connection string from MongoDB Atlas
   - Generate a strong JWT secret key
   - Update API URLs for your deployment

## 🔐 Environment Variables Needed:

### Backend (`backend/.env`):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-super-secret-key-here
ALGORITHM=HS256
```

### Frontend (`tour-guide/.env`):
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## 🚫 Never Commit:
- Real database passwords
- Production API keys
- JWT secrets
- Personal upload files
- Any `.env` files with real credentials

Keep your secrets safe! 🛡️