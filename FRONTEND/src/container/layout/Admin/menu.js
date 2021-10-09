import {
    FileOutlined, RiseOutlined,
    FolderOutlined, AppstoreAddOutlined, PieChartOutlined,
    HomeOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined,
    UsergroupAddOutlined, SkinOutlined, ShoppingOutlined, BoldOutlined, UserAddOutlined,
    SettingOutlined, BranchesOutlined, BankOutlined, UserSwitchOutlined, BgColorsOutlined, MailOutlined
} from '@ant-design/icons';
var menu = [
    {
        title: "Tổng quan",
        path: "/admin/dashboard",
        icon: <HomeOutlined />,
    },
    {
        title: "Báo cáo",
        icon: <PieChartOutlined />,
        subMenu: [
            {
                title: "Doanh thu",
                path: "/admin/report/revenue",
                icon: <RiseOutlined />,
            },
            {
                title: "Khách hàng",
                path: "/admin/report/customer",
                icon: <UsergroupAddOutlined />,
            },
        ]
    },
    // {
    //     title: "Chi nhánh",
    //     path: "/admin/branch",
    //     icon: <BranchesOutlined />,
    // },
    // {
    //     title: "Kho",
    //     path: "/admin/warehouse",
    //     icon: <BankOutlined />,
    // },
    {
        title: "Sản phẩm",
        // path: "/admin/products-admin",
        icon: <ShoppingOutlined />,
        subMenu: [
            {
                title: "Sản phẩm",
                path: "/admin/products-admin",
                icon: <SkinOutlined />,
            },
            {
                title: "Danh mục",
                path: "/admin/categories",
                icon: <FolderOutlined />,
            },
            {
                title: "Nhập hàng",
                path: "/admin/products-import",
                icon: <VerticalAlignBottomOutlined />,
            },
            {
                title: "Xuất hủy",
                path: "/admin/products-export",
                icon: <VerticalAlignTopOutlined />,
            },
            // {
            //     title: "Kích thước",
            //     path: "/admin/sizes",
            //     icon: <AppstoreAddOutlined />,
            // },
            // {
            //     title: "Màu sắc",
            //     path: "/admin/colors",
            //     icon: <BgColorsOutlined />,
            // },
            {
                title: "Thương hiệu",
                path: "/admin/brands",
                icon: <BoldOutlined />,
            },
        ]
    },
    {
        title: "Khách hàng",
        path: "/admin/customers",
        icon: <UsergroupAddOutlined />,
    },
    {
        title: "Đơn hàng",
        path: "/admin/orders",
        icon: <SettingOutlined />,
    },
    // {
    //     title: "Tin tức",
    //     path: "/admin/blogs",
    //     icon: <FolderOutlined />,
    // },
    // {
    //     title: "Liên hệ",
    //     path: "/admin/contacts",
    //     icon: <MailOutlined />,
    // },
    {
        title: "Tài khoản",
        path: "/admin/profile",
        icon: <UserSwitchOutlined />,
    },
    // {
    //     title: "Slides",
    //     path: "/admin/slides",
    //     icon: <SettingOutlined />,
    // },
]
export default menu;