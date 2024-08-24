// ThreeDots component
export function ThreeDots() {
    return (
        <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white rounded-full animate-loading-dot" />
            <div className="w-1 h-1 bg-white rounded-full animate-loading-dot delay-200" />
            <div className="w-1 h-1 bg-white rounded-full animate-loading-dot" />
        </div>
    );
}
