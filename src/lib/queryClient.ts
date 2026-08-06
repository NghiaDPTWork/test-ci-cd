import { QueryClient } from "@tanstack/react-query";

// ✅ BƯỚC 1: Tạo QueryClient instance
// QueryClient = "Người quản lý" tất cả queries trong app
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 🎛️ Config mặc định cho TẤT CẢ queries

      // 1. Refetch on Window Focus
      refetchOnWindowFocus: "always",
      // ⚠️ Mặc định: true (tự fetch lại khi user quay lại tab)
      // 💡 Học: Tắt để dễ debug (log đỡ nhảy loạn)
      // 💡 Production: Bật lại để data luôn tươi
      // Chuyển tab là tab B refetch lại data => Biến data 1 thành data cũ trên chuyển trang

      // 2. Retry Failed Requests
      retry: 1,
      // ⚠️ Mặc định: 3 lần
      // 💡 Học: Giảm xuống 1 để nhanh thấy lỗi
      // 💡 Production: 2-3 là hợp lý (network chập chờn)

      // 3. Stale Time
      staleTime: 5000,
      // ⚠️ Mặc định: 0 (data ngay lập tức "cũ")
      // 💡 Production: 30s - 5 phút tùy data
      // Thời điểm lưu vào cache - nếu chung 1 page mà 2 lần fetch thì nó ghi đè
      // Thời gian sẽ tính khác vì nó là 1 new Object (key - value)
      // Khi nào re-fetch trong React-Query
      // 1. Có component dùng data
      // 2. Data bị cũ trên 1 trang
      // Cơ chế Pooling
      // (Chuyển tiền trên 1 cái ứng dụng khác - ứng dụng fake real-time của react-query vs stale-time)
      // Chứng khoáng - WebSocket

      // 4. Cache Time (GC Time)
      gcTime: 5 * 60 * 1000,
      // ⚠️ Mặc định: 5 phút
      // 💡 Cache tồn tại 5 phút kể từ khi không còn component nào dùng
      // Tránh tràn bộ nhớ
    },
  },
});
