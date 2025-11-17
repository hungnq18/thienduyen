import { ArrowLeft, CheckCircle2, Clock3, Loader2, Mail } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import adminService from '../../services/adminService';

const contactStatusOptions = [
  { value: 'pending', label: 'Chờ xử lý' },
  { value: 'read', label: 'Đã đọc' },
  { value: 'replied', label: 'Đã phản hồi' },
  { value: 'archived', label: 'Lưu trữ' },
];

const statusColors = {
  pending: 'bg-amber-50 text-amber-700',
  read: 'bg-sky-50 text-sky-700',
  replied: 'bg-emerald-50 text-emerald-700',
  archived: 'bg-gray-100 text-gray-500',
};

const ContactDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [replySending, setReplySending] = useState(false);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [error, setError] = useState('');

  const statusLabel = useMemo(() => {
    const found = contactStatusOptions.find((opt) => opt.value === contact?.status);
    return found ? found.label : contact?.status;
  }, [contact]);

  const fetchContact = async () => {
    try {
      setLoading(true);
      const data = await adminService.getContactById(id);
      setContact(data);
      if (!replySubject) {
        setReplySubject(`Phản hồi từ Thiện Duyên`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tải thông tin liên hệ.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, [id]);

  const handleStatusChange = async (value) => {
    try {
      setStatusUpdating(true);
      await adminService.updateContactStatus(id, { status: value });
      await fetchContact();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể cập nhật trạng thái.');
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim()) {
      setError('Vui lòng nhập nội dung phản hồi.');
      return;
    }
    try {
      setReplySending(true);
      setError('');
      await adminService.replyToContact(id, {
        subject: replySubject,
        message: replyMessage,
      });
      setReplyMessage('');
      await fetchContact();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể gửi phản hồi.');
    } finally {
      setReplySending(false);
    }
  };

  if (loading && !contact) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Loader2 className="h-4 w-4 animate-spin" /> Đang tải thông tin liên hệ...
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Quay lại
        </button>
        <p className="text-sm text-red-500">Không tìm thấy liên hệ.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> Quay lại danh sách
      </button>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#CC8C81] font-semibold">Liên hệ</p>
          <h2 className="text-2xl font-semibold text-[#21060A]">{contact.name}</h2>
          <p className="text-sm text-gray-500">{new Date(contact.createdAt).toLocaleString('vi-VN')}</p>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Thông tin liên hệ</p>
                <p className="text-lg font-semibold text-[#21060A]">{contact.email}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[contact.status] || 'bg-gray-100 text-gray-500'}`}>
                {statusLabel}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p className="text-gray-400 text-xs uppercase">Số điện thoại</p>
                <p className="font-medium text-gray-800">{contact.phone || 'Không có'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase">Trạng thái</p>
                <select
                  className="w-full mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  value={contact.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  disabled={statusUpdating}
                >
                  {contactStatusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase">Tài khoản gửi</p>
                <p className="font-medium text-gray-800">
                  {contact.userId?.fullName || contact.userId?.email || 'Không xác định'}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase">Nguời phụ trách</p>
                <p className="font-medium text-gray-800">
                  {contact.replyHistory?.length ? contact.replyHistory[contact.replyHistory.length - 1].adminEmail || 'Admin' : 'Chưa phản hồi'}
                </p>
              </div>
            </div>
            <div className="text-sm">
              <p className="text-gray-400 text-xs uppercase mb-2">Tin nhắn</p>
              <p className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-gray-700 whitespace-pre-wrap">
                {contact.message}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#6B1F2F]" />
              <div>
                <p className="text-sm font-semibold text-[#21060A]">Gửi phản hồi qua email</p>
                <p className="text-xs text-gray-500">Nội dung sẽ được gửi trực tiếp tới {contact.email}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500">Tiêu đề</label>
                <input
                  type="text"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#6B1F2F] focus:outline-none"
                  placeholder="VD: Thông tin phản hồi từ Thiện Duyên"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">Nội dung</label>
                <textarea
                  rows={6}
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#6B1F2F] focus:outline-none"
                  placeholder="Nhập nội dung phản hồi..."
                />
              </div>
              <button
                onClick={handleSendReply}
                disabled={replySending}
                className="inline-flex items-center justify-center rounded-xl bg-[#6B1F2F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#571726] disabled:opacity-50"
              >
                {replySending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang gửi...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" /> Gửi phản hồi
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
            <p className="text-sm font-semibold text-[#21060A] mb-4">Lịch sử phản hồi</p>
            {contact.replyHistory?.length ? (
              <div className="space-y-4">
                {contact.replyHistory
                  .slice()
                  .reverse()
                  .map((item, index) => (
                    <div key={`${item.sentAt}-${index}`} className="relative pl-6">
                      <span className="absolute left-0 top-1.5 flex h-3 w-3 items-center justify-center">
                        <span className="h-2 w-2 rounded-full bg-[#6B1F2F]" />
                      </span>
                      <p className="text-xs text-gray-400">
                        {new Date(item.sentAt).toLocaleString('vi-VN')} • {item.adminEmail || 'Admin'}
                      </p>
                      <p className="text-sm font-semibold text-gray-800">{item.subject}</p>
                      <p className="text-sm text-gray-600 whitespace-pre-wrap">{item.message}</p>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock3 className="h-4 w-4" /> Chưa có phản hồi nào.
              </div>
            )}
          </div>

          {contact.lastRepliedAt && (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 shadow-sm p-4 text-sm text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Đã phản hồi lần cuối vào {new Date(contact.lastRepliedAt).toLocaleString('vi-VN')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactDetailPage;

