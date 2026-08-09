function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      {/* Navbar (reuse same style as Landing) */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-slate-100 bg-white">
        <div className="flex items-center gap-1">
          <span className="text-emerald-500 text-2xl">📍</span>
          <span className="text-2xl font-bold text-slate-300">
            <span className="text-emerald-500">C</span>IVIX
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-1.5 text-slate-700 text-sm font-medium">
            ⓘ About
          </a>
          <button className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-medium px-4 py-2 rounded-full text-sm">
            📞 Contact Us
          </button>
          <a href="#" className="flex items-center gap-1.5 text-slate-700 text-sm font-medium">
            👥 Our contributors
          </a>
          <a href="#" className="flex items-center gap-1.5 text-slate-700 text-sm font-medium">
            🗳️ Voting System
          </a>
          <a href="#" className="flex items-center gap-1.5 text-slate-700 text-sm font-medium">
            🗺️ Issue Map
          </a>
          <a href="#" className="flex items-center gap-1.5 text-slate-700 text-sm font-medium">
            ⚠️ Feedback
          </a>
          <button className="flex items-center gap-1.5 bg-red-500 text-white font-bold px-4 py-2 rounded-full text-sm">
            ⚠️ SOS
          </button>
          <div className="w-11 h-6 bg-slate-200 rounded-full relative cursor-pointer">
            <div className="w-5 h-5 bg-amber-400 rounded-full absolute top-0.5 left-0.5"></div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-12">
        {/* Left column */}
        <div>
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-lime-400 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-white text-2xl">✨</span>
          </div>
          <h1 className="text-4xl font-extrabold text-emerald-900 mb-1">Contact Us</h1>
          <div className="w-16 h-1 bg-emerald-500 rounded-full mb-6"></div>
          <p className="text-slate-500 mb-8">
            Have questions or need help? We'd love to hear from you.
            <br />
            Fill out the form and we'll respond quickly.
          </p>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                ✉️
              </div>
              <div>
                <p className="font-semibold text-slate-800">Email Us</p>
                <p className="text-emerald-600">support@civix.com</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                🕒
              </div>
              <div>
                <p className="font-semibold text-slate-800">Response Time</p>
                <p className="text-emerald-600">Within 24 hours</p>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-xl p-5">
              <p className="font-bold text-emerald-900 mb-3">Why Contact Us?</p>
              <ul className="space-y-2 text-emerald-800 text-sm">
                <li className="flex items-center gap-2">✅ Technical support and assistance</li>
                <li className="flex items-center gap-2">✅ Feature requests and feedback</li>
                <li className="flex items-center gap-2">✅ General inquiries and questions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right column - Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-emerald-800 text-center mb-1">
            Send us a Message
          </h2>
          <p className="text-emerald-600 text-center text-sm mb-6">
            We'll respond as quickly as possible
          </p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-lime-500 text-white font-semibold py-3 rounded-xl transition"
            >
              📨 Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;