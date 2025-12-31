# Deployment Guide for Render

## 📋 Pre-deployment Steps

1. **Push your code to GitHub** (make sure all changes are committed)
2. **Create accounts**: Sign up for [Render](https://render.com)

## 🚀 Render Deployment Steps

### Option 1: Using render.yaml (Recommended)

1. **Connect Repository**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will detect the `render.yaml` file

2. **Configure Environment Variables**:
   - Backend will auto-generate `SECRET_KEY`
   - Add `MONGODB_URI` if using MongoDB (optional)
   - Add `FRONTEND_URL` with your frontend URL

3. **Deploy**: Render will deploy both frontend and backend automatically

### Option 2: Manual Deployment

#### Deploy Backend:
1. **New Web Service**:
   - Connect GitHub repository
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

2. **Add Environment Variables**:
   ```
   SECRET_KEY=your-secret-key-here
   ALGORITHM=HS256
   MONGODB_URI=your-mongodb-uri (optional)
   ```

3. **Add Persistent Disk**:
   - Go to service settings
   - Add disk: Mount Path `/opt/render/project/src/uploads`
   - Size: 1GB (free tier)

#### Deploy Frontend:
1. **New Static Site**:
   - Connect same GitHub repository
   - **Root Directory**: `tour-guide`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

2. **Add Environment Variable**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

## ✅ Post-Deployment Steps

1. **Update API URLs**: Replace `your-api-name` in the code with actual backend URL
2. **Test the application**: Visit your frontend URL
3. **Create admin user**: Login with `admin@example.com` / `admin123`
4. **Test file uploads**: Create a destination with image

## 📝 Important Notes

- **Free tier limitations**: Apps sleep after 15 minutes of inactivity
- **Cold starts**: First request may take 30+ seconds after sleeping
- **File storage**: 1GB free persistent disk for uploads
- **Custom domains**: Available on paid plans

## 🔧 Troubleshooting

- **CORS errors**: Check `FRONTEND_URL` environment variable
- **API not loading**: Verify backend URL in frontend `.env.production`
- **Images not displaying**: Check uploads directory permissions
- **Database errors**: Ensure `MONGODB_URI` is set (if using MongoDB)

## 💰 Costs

- **Free Tier**: 750 hours/month per service (enough for personal projects)
- **Paid Plans**: Start at $7/month for always-on services
- **Bandwidth**: 100GB/month free

Your app should be live at:
- Frontend: `https://tour-guide-frontend.onrender.com`
- Backend API: `https://tour-guide-api.onrender.com`