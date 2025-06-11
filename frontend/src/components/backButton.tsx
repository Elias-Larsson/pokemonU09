import { useNavigate } from 'react-router'



export const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button
    onClick={() => navigate(-1)}
    className="absolute top-4 left-4 w-30 text-center space-x-4 border-1 bg-zinc-200 text-black px-4 py-2 rounded border-black hover:bg-zinc-300 transition"
  >
    Back
  </button>
  )
}