import Link from "next/link";
import "./admin.css";

export const metadata = {
  title: "Trang quản trị",
  description: "Quản trị",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-container">
      {/* HEADER */}
      <header className="header">
        <div className="inner-logo">
          <Link href="#">
            <span>28</span>
            <span>Admin</span>
          </Link>
        </div>

        <div className="inner-wrap">
          <div className="inner-notify">
            <img src="/icon-bell.svg" alt="" />
            <span>6</span>
          </div>

          <div className="inner-account">
            <div className="inner-avatar">
              <img src="/avatar.png" alt="" />
            </div>
            <div className="inner-text">
              <div className="inner-name">Lê Văn A</div>
              <div className="inner-role">Admin</div>
            </div>
          </div>

          <div className="inner-button-menu">
            <i className="fa-solid fa-bars" />
          </div>
        </div>
      </header>

      {/* SIDEBAR */}
      <nav className="sider">
        <ul className="inner-menu">
          <li>
            <Link className="active" href="/admin/dashboard">
              <i className="fa-solid fa-gauge-high"></i> Tổng quan
            </Link>
          </li>
          <li>
            <Link href="/admin/categories">
              <i className="fa-solid fa-table-cells-large"></i> Quản lý danh mục
            </Link>
          </li>
          <li>
            <Link href="/admin/tours">
              <i className="fa-solid fa-table-list"></i> Quản lý tour
            </Link>
          </li>
          <li>
            <Link href="/admin/orders">
              <i className="fa-solid fa-list-check"></i> Quản lý đơn hàng
            </Link>
          </li>
          <li>
            <Link href="/admin/users">
              <i className="fa-solid fa-user"></i> Quản lý người dùng
            </Link>
          </li>
          <li>
            <Link href="/admin/contacts">
              <i className="fa-solid fa-user-group"></i> Thông tin liên hệ
            </Link>
          </li>
        </ul>

        <hr />

        <ul className="inner-menu">
          <li>
            <Link href="/admin/settings">
              <i className="fa-solid fa-gear"></i> Cài đặt chung
            </Link>
          </li>
          <li>
            <Link href="/admin/profile">
              <i className="fa-solid fa-user-gear"></i> Thông tin cá nhân
            </Link>
          </li>
          <li>
            <Link className="inner-logout" href="/logout">
              <i className="fa-solid fa-power-off"></i> Đăng xuất
            </Link>
          </li>
        </ul>
      </nav>
      <div className="sider-overlay"> </div>
      {/* CONTENT */}
      <main className="admin-content">{children}</main>
    </div>
  );
}
