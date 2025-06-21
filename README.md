# SummarizeAI

SummarizeAI is a powerful AI-driven SaaS tool that converts lengthy PDF documents into clear, concise summaries in seconds. Whether you're a student, researcher, or busy professional, SummarizeAI helps you save time and extract key insights effortlessly.

🚧 **Project Status: In Development** 🚧
This project is currently under active development. Features are being added and refined regularly.

[![SummarizeAI](./public/homepage.png)](https://summarize-ai-eta.vercel.app)

## ✨ Features

### 🧠 AI-Powered Summary Generation
- 🤖 **Gemini Flash 2.0 Integration** - Advanced AI-powered text analysis and summarization
- ✨ **Emoji-Enhanced Summaries** - Visually appealing summaries with relevant emojis
- 📝 **Markdown-Formatted Output** - Rich text formatting with bold, italics, and structured content
- 🎯 **Context-Aware Analysis** - Intelligent key point extraction and insight generation

### 🎨 Visual Summary Experience
- 📱 **Instagram-Style Summary Reels** - Interactive, visually engaging summary displays
- 🎬 **Smooth Animations** - Beautiful transitions and interactive elements
- 👆 **Touch-Friendly Navigation** - Swipe through summary slides with dots and arrows
- 💖 **Social Media Actions** - Like, comment, share, and save functionality
- 🎨 **Gradient Backgrounds** - Modern, eye-catching visual design

### 🔤 Advanced Text Rendering
- 📄 **MarkdownRenderer Component** - Reusable component for formatted text display
- 🎨 **Custom Styling** - Dark theme with brand-consistent typography
- 📊 **Rich Content Support** - Headers, lists, blockquotes, and code blocks
- 🔄 **Responsive Design** - Optimized for all screen sizes

### 📋 Core Functionality
- 📝 Clear, structured summaries with key points and insights
- 🎨 Beautiful, interactive summary viewer with progress tracking
- 🔒 Secure file handling and processing
- 🔐 Protected routes and API endpoints
- 📊 User dashboard for managing summaries
- 📱 Responsive design for mobile and desktop
- 🔄 Real-time updates and path revalidation
- 🚀 Production-ready deployment
- 🔔 Toast notifications for upload status, processing updates, and error handling
- 📈 Performance optimizations
- 🔍 SEO-friendly summary generation
- 🗂️ Markdown Export that can be converted into a blog post
- 🔑 Secure authentication with JWT and Edge Runtime support

## 🛠️ Core Technologies

### 🤖 AI & Machine Learning
- 🧠 **Google Gemini Flash 2.0** - Advanced language model for high-quality summarization
- 🤖 **AI SDK** - Modern AI development framework for seamless integration
- 🧠 **Langchain** - PDF parsing, text extraction, and document chunking

### ⚛️ Frontend & UI
- 🚀 **Next.js 15 App Router** - Server-side rendering, routing, and API endpoints with Server Components and Server Actions
- ⚛️ **React 19** - Building interactive user interfaces with reusable components
- 🎨 **ShadcN UI** - Accessible, customizable React components
- 📜 **ReactMarkdown** - Rich text rendering with custom styling
- 💅 **TailwindCSS 4** - Utility-first, responsive styling

### 💾 Backend & Database
- 💾 **NeonDB (PostgreSQL)** - Serverless database storage with Drizzle ORM
- 📤 **UploadThing** - Secure PDF uploads (up to 32MB) and file management
- 🔐 **JWT Authentication** - Edge-compatible authentication with jose
- 🍪 **Universal Cookie** - Cookie management for session handling

### 🛠️ Development Tools
- 📜 **TypeScript** - Static typing and enhanced development experience
- ✅ **Zod** - Form validation and schema validation
- 🔔 **Sonner** - Toast notifications for user feedback
- 🚀 **Vercel** - Production deployment and hosting

## 🚀 AI Integration Setup

### Environment Variables

Add the following to your `.env.local` file:

```env
# Database
DATABASE_URL="your_neondb_connection_string"

# JWT Secret
JWT_SECRET="your_jwt_secret_here"

# Google AI API Key for Gemini Flash 2.0
GOOGLE_API_KEY="your_google_api_key_here"

# UploadThing Configuration
UPLOADTHING_SECRET="your_uploadthing_secret_here"
UPLOADTHING_APP_ID="your_uploadthing_app_id_here"
```

### Google AI API Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key for Gemini
3. Add the API key to your environment variables
4. Ensure you have access to Gemini Flash 2.0 model

## 📱 Component Usage

### MarkdownRenderer Component

```tsx
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";

// Basic usage
<MarkdownRenderer content={markdownText} />

// With custom styling
<MarkdownRenderer 
  content={markdownText} 
  className="custom-styles" 
/>
```

### Summary Reel Component

```tsx
import { SummaryReelComponent } from "@/components/ui/summary-reel";

<SummaryReelComponent 
  summaryReel={summaryReelData} 
  onClose={handleClose} 
/>
```

## Database Setup

The project uses NeonDB (PostgreSQL) with Drizzle ORM for database management. The schema includes:

- Users table with secure password hashing
- Document storage and management
- Summary tracking and user preferences
- AI-generated summary storage with status tracking

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/codewithalihamza/SummarizeAI.git
   ```

2. Install dependencies using NPM:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   Create a `.env.local` file in the root directory with the required variables listed above.

4. Run database migrations:
   ```bash
   npm run db:generate
   npm run db:push
   ```

## Usage

To start the development server:

```bash
npm run dev
```

To build the project for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## 🎯 How It Works

### AI Summary Generation Process

1. **PDF Upload** - User uploads PDF document via UploadThing
2. **Text Extraction** - Langchain processes and extracts text from PDF
3. **AI Analysis** - Gemini Flash 2.0 analyzes content and generates summary
4. **Markdown Formatting** - AI output is formatted with markdown syntax
5. **Visual Reel Creation** - Structured data is prepared for Instagram-style display
6. **Database Storage** - Summary and metadata are saved to PostgreSQL
7. **Rich Display** - MarkdownRenderer displays formatted summary with styling

### Summary Reel Experience

- **Interactive Slides** - Navigate through key points with smooth transitions
- **Visual Engagement** - Emoji-enhanced content with gradient backgrounds
- **Social Actions** - Like, save, and share functionality
- **Responsive Design** - Optimized for mobile and desktop viewing

## Current Development Status

✅ **Recently Completed:**
- ✅ Gemini Flash 2.0 AI integration for advanced summarization
- ✅ Instagram-style visual summary reel component
- ✅ Markdown rendering with custom dark theme styling
- ✅ Reusable MarkdownRenderer component
- ✅ Enhanced error handling and fallback mechanisms
- ✅ Responsive design improvements across all components

🚧 **Features in Progress:**
- User authentication system with secure session management
- PDF processing pipeline optimization
- Advanced summary customization options
- Enhanced error handling and user feedback
- Performance optimizations for large documents

## Documentation Links

- [Google AI Studio](https://makersuite.google.com/app/apikey) - Gemini API key management
- [AI SDK documentation](https://sdk.vercel.ai/docs) - AI integration framework
- [ReactMarkdown documentation](https://github.com/remarkjs/react-markdown) - Markdown rendering
- [react-icons documentation](https://react-icons.github.io/react-icons/)
- [Shadcn/UI documentation](https://ui.shadcn.com/docs)
- [Next.js documentation](https://nextjs.org/docs)
- [Langchain documentation](https://js.langchain.com/docs/)
- [NeonDB documentation](https://neon.tech/docs)
- [UploadThing documentation](https://uploadthing.com/docs)
- [Drizzle ORM documentation](https://orm.drizzle.team/docs/overview)

## Contributing

While this project is still in development, contributions are welcome! Please feel free to submit issues and pull requests.

## 🔮 Future Enhancements

- 🎨 Custom summary themes and styling options
- 📊 Analytics dashboard for summary insights
- 🔗 Share summaries via social media platforms
- 📱 Mobile app for iOS and Android
- 🌐 Multi-language support
- 🔊 Audio summary generation
- 📈 Batch processing for multiple documents
