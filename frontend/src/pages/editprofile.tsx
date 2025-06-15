import { useState } from "react";
import { Button } from "../components/button";
import axios, { AxiosError } from "axios";

export const EditProfile = () => {
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [actionType, setActionType] = useState<"update" | "delete" | null>(
    null,
  );

  const handleUpdate = async () => {
    setActionType("update");
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    setActionType("delete");
    setShowConfirm(true);
  };

  const confirmAction = async () => {
    setShowConfirm(false);
    if (actionType === "update") {
      try {
        await axios.put(
          "https://pokemonu09.onrender.com/auth/username",
          { username },
          { withCredentials: true },
        );
        setMessage("Username updated.");
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        setMessage(err.response?.data?.message ?? "Update failed.");
      }
    } else if (actionType === "delete") {
      try {
        await axios.delete("https://pokemonu09.onrender.com/auth/account", {
          withCredentials: true,
        });
        setMessage("Account deleted.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        setMessage(err.response?.data?.message ?? "Delete failed.");
      }
    }
  };

  const cancelAction = () => {
    setShowConfirm(false);
    setMessage(`${actionType === "update" ? "Update" : "Delete"} cancelled.`);
    setActionType(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/sunsetbg.png')] bg-cover bg-center p-4">
      <h1 className="text-3xl font-pixel text-black mb-4">Edit Profile</h1>
      <img src="/mew.svg" alt="Edit Icon" className="w-24 mb-6" />

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="w-64 px-3 py-2 mb-4 border bg-white"
      />

      <div className="w-64 text-center space-x-4">
        <Button
          name="Update"
          color="yellow"
          buttonType="click"
          onClick={handleUpdate}
        />
        <Button
          name="Delete"
          color="red"
          buttonType="click"
          onClick={handleDelete}
        />
      </div>
      {message && <p className="mt-4 font-pixel text-black">{message}</p>}

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg border border-black font-pixel text-black">
            <p className="mb-4">
              {actionType === "update"
                ? "Are you sure you want to update your username?"
                : "Are you sure you want to delete your account? This action cannot be undone."}
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                name="Confirm"
                color="red"
                buttonType="click"
                onClick={confirmAction}
              />
              <Button
                name="Cancel"
                color="yellow"
                buttonType="click"
                onClick={cancelAction}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
