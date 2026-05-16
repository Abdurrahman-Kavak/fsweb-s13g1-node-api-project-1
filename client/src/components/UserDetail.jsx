export default function UserDetail({ user }) {
  if (!user) return null;
  return (
    <div className="flex-1 p-10 flex flex-col max-w-2xl mx-auto w-full mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-200">
        Kullanıcı Bilgileri
      </h2>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-6">
        <div>
          <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
            İsim
          </span>
          <span className="text-xl font-medium text-gray-800 mt-1 block">
            {user.name}
          </span>
        </div>
        <div>
          <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
            Biyografi
          </span>
          <span className="text-lg font-medium text-gray-800 mt-1 block">
            {user.bio}
          </span>
        </div>
      </div>
    </div>
  );
}
