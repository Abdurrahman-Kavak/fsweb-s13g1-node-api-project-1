export default function ActionLogs({ logs, userRole }) {
  // Oluşturan kişiyi bul (en eski 'oluşturuldu' logunu arar, bulamazsa Default döner)
  const creationLog = [...logs]
    .reverse()
    .find(
      (l) => l.action.includes("oluşturuldu") || l.action.includes("eklendi"),
    );
  const creator = creationLog ? creationLog.by : "Default";

  const displayLogs = userRole === "admin" ? logs : logs.slice(0, 1);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="mb-4 p-3 bg-indigo-50 border border-indigo-100 text-indigo-800 rounded-lg text-sm">
        <span className="font-bold">Oluşturan:</span> {creator}
      </div>

      {displayLogs.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">Tarih</th>
                <th className="px-4 py-3">İşlem</th>
                <th className="px-4 py-3">Kişi</th>
              </tr>
            </thead>
            <tbody>
              {displayLogs.map((log) => (
                <tr
                  key={log.id}
                  className="bg-white border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    {log.date}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {log.action}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{log.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg border border-gray-200">
          İşlem yok.
        </p>
      )}
      {userRole !== "admin" && logs.length > 1 && (
        <p className="text-xs text-gray-400 mt-4 italic text-center">
          Sadece son işlemi görüntüleme yetkiniz var.
        </p>
      )}
    </div>
  );
}
