# 🚚 Moving Calculator Demo - Déménagement Boréal

A professional moving company calculator demo built with Webflow export and Vercel serverless functions.

## 🎯 Demo Features

- **Multi-step form** with 4 steps
- **Real-time validation** and progress tracking
- **Custom date picker** (Flatpickr)
- **Quote calculation API** (serverless function)
- **Professional quote display** with detailed breakdown
- **Responsive design** for all devices

## 🚀 Quick Start

1. **Deploy to Vercel**: Connect this repository to Vercel
2. **Access the calculator**: Visit `/calculateur.html` on your deployed site
3. **Test the form**: Fill out the multi-step form to get a quote

## 📋 Calculator Steps

1. **Personal Information**: Name and email
2. **Service Type**: Residential, commercial, long-distance, or other
3. **Project Details**: Company info, people count, website
4. **Final Details**: Country and preferred moving date

## 💰 Pricing Logic

The calculator uses a sophisticated pricing algorithm based on:
- **Service type** (residential, commercial, long-distance)
- **Number of people** involved in the move
- **Budget level** selected
- **Base pricing** with multipliers

## 🛠️ Technical Stack

- **Frontend**: Webflow export (HTML/CSS/JS)
- **Backend**: Vercel serverless functions
- **Date Picker**: Flatpickr
- **Deployment**: Vercel

## 📁 Project Structure

```
├── calculateur.html          # Main calculator page
├── api/
│   └── calculate-quote.js    # Serverless function for calculations
├── css/                      # Webflow styles
├── js/                       # Webflow JavaScript
├── images/                   # Webflow images
├── package.json              # Dependencies
└── vercel.json              # Vercel configuration
```

## 🎨 Customization

The calculator is designed to be easily customizable:
- **Colors**: Update CSS variables in the HTML
- **Pricing**: Modify the calculation logic in `api/calculate-quote.js`
- **Form fields**: Add/remove fields in the HTML form
- **Validation**: Update validation rules in the JavaScript

## 📱 Demo URL

Once deployed to Vercel, your calculator will be available at:
`https://your-project.vercel.app/calculateur.html`

## 🔧 Development

To run locally:
```bash
npm install
npm run dev
```

## 📞 Support

This is a demo project for client presentation. For production use, additional features like email integration, database storage, and payment processing would be needed.

---

**Built for Déménagement Boréal** - Professional moving services in Quebec, Canada.
