import { useEffect, useState } from "react";

import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

const EmailVerify = () => {
  const [status, setStatus] = useState("Verifying...");
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [timer, setTimer] = useState(null);
  useEffect(() => {
    const token = params.get("token");
    if (!token) return setStatus("No token found.");
    const verify = async () => {
      await fetch(
        `https://i-mage-enwv.onrender.com/api/auth/verify-email?token=${token}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json()) // ⬅️ parse JSON body first
        .then((data) => {
          setStatus(data.message); // ✅ now data.message is safe
          setTimer(3);
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    verify();
  }, []);

  return (
    <div className="flex items-center justify-center bg-black flex-col h-screen w-full text-white">
      <h2 className="text-lg">{status}</h2>
      {timer && <h2>redirecting in {timer} seconds</h2>}
    </div>
  );
};

export default EmailVerify;
