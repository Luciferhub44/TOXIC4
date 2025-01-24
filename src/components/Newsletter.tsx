const Newsletter = () => {
  return (
    <div className="bg-[#FFD513] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30z\' fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          backgroundSize: '30px 30px'
        }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="px-6 py-6 md:px-12 lg:py-12 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            <span className="block">JOIN THE TOXIC FAMILY</span>
            <span className="block text-sm mt-2">
              Get exclusive drops, early access, and 10% off your first order
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-64 px-5 py-3 border-2 border-black rounded-l-md focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500"
              />
              <button className="bg-black text-[#FFD513] px-6 py-3 rounded-r-md font-bold hover:bg-gray-900 transition-colors whitespace-nowrap">
                SUBSCRIBE
              </button>
            </div>
            <p className="mt-2 text-xs text-black/70">
              By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;