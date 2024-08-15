'use client'
const LoginModal: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[340px] h-[210px] bg-white rounded-3xl flex items-center justify-center">
        <div className="flex flex-col items-center px-[60px] py-[40px] gap-[32px]">
          <p className="text-center text-black text-[16px]">
            자세한 정보를 보고싶다면?
          </p>
          <button className="px-8 py-2 text-[16px] text-purple-600 border-2 border-purple-600 rounded-full hover:bg-purple-100">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
