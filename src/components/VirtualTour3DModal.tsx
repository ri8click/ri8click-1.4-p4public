 backdrop-blur-md rounded-xl p-3.5 border border-slate-700 shadow-2xl text-white">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Architectural Floor Plan</span>
                  <button type="button" onClick={() => setShowFloorplan(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-1.5">
                  {scenes.map((sc, idx) => (
                    <button
                      type="button"
                      key={sc.id}
                      onClick={() => setActiveSceneIndex(idx)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-colors text-left cursor-pointer ${
                        activeSceneIndex === idx 
                          ? 'bg-blue-600 text-white font-semibold' 
                          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <span>{sc.name}</span>
                      <span className="text-[10px] opacity-80">{sc.tag}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* Bottom Room Selector & Action Strip */}
        <div className="relative z-30 bg-slate-900 px-4 py-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
          
          {viewMode === 'movie' && property.virtualTourVideoUrl ? (
            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                <Film className="w-4 h-4 text-amber-400" />
                <span className="font-semibold">Super Admin Exclusive Movie Tour</span>
                <span className="text-slate-400 hidden sm:inline">| High Definition Video Walkthrough</span>
              </div>
              <button
                type="button"
                onClick={() => setViewMode('360')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-blue-400" />
                <span>Switch to 360° Tour</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-thin">
              {scenes.map((scene, idx) => {
                const active = activeSceneIndex === idx;
                return (
                  <button
                    type="button"
                    key={scene.id}
                    onClick={() => setActiveSceneIndex(idx)}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all shrink-0 text-left cursor-pointer ${
                      active 
                        ? 'bg-blue-600/30 border-blue-500 text-white font-semibold ring-1 ring-blue-500' 
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    <img
                      src={scene.image}
                      alt={scene.name}
                      className="w-8 h-8 rounded object-cover border border-slate-600"
                    />
                    <div className="text-[11px] leading-tight">
                      <div className="text-white font-medium truncate max-w-[120px]">{scene.name}</div>
                      <div className="text-[9.5px] text-slate-400">{scene.tag}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onScheduleVisit) onScheduleVisit(property);
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-sm active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Book Site Visit</span>
            </button>

            <a
              href={`https://wa.me/923365666727?text=${encodeURIComponent(
                `Assalam o Alaikum, I just took the 3D Virtual Tour for ${property.title} on ri8click and want to discuss purchase details.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Agent</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};

export default VirtualTour3DModal;
