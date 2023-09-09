import Topbar from "@/components/Topbar/Topbar";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";


export default function AddProblems() {
	const [user] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const CheckisAdmin = async () => {
		if (user) {
			const docRef = doc(firestore, "users", user.uid);
			const docSnap = await getDoc(docRef);
			const isAdmin = docSnap.get("Admin");
			setIsAdmin(isAdmin);
			setIsLoading(false); 
		}
	};
	const [newProblem, setNewProblem] = useState({
		id: "",
		title: "",
		difficulty: "",
		category: "",
		order: 0,
		videoId: "",
		link: "",
		likes: 0,
		dislikes: 0,
	});

    useEffect(() => {
        const fetchIsAdmin = async () => {
            await CheckisAdmin();
        };

        fetchIsAdmin();
        // Set a timeout to handle loading after 10 seconds
        const timeout = setTimeout(() => {
            setIsLoading(false);
            clearTimeout(timeout);
        }, 3000);
    }, [user]);


    if (isLoading) {
        return null; // Render nothing while data is loading
    }

    if (!user || !isAdmin) {
        // If user is not logged in or not an admin, redirect to 404 page
		router.push('/404');
        return null;
    }

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewProblem({
			...newProblem,
			[e.target.name]: e.target.value,
		})
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();// prevent the page from refreshing
		//convert order to int
		const finalProblem = {
			...newProblem,
			order: parseInt(newProblem.order.toString())
		}
		await setDoc(doc(firestore, "problems", newProblem.id), finalProblem);
		alert("saved to db");
	};


	return (
		<>
			<main className='bg-dark-layer-2 min-h-screen'>
				<Topbar />
				<div className="flex flex-col items-center justify-center mt-10">				
					<h1
						className='text-2xl text-center text-gray-700 dark:text-gray-400 font-medium
						uppercase mt-10 mb-2'

					>
						👇 הוספת בעיות למאגר הבעיות
					</h1>
					<h2 className='text-1xl text-center text-gray-700 dark:text-gray-400 font-medium
						uppercase mb-5'> utils/problems לזכור שבשביל להוסיף בעיה צריך ליצור בשבילה עמוד ב</h2>
					<form className="p-6 flex flex-col gap-3 border rounded-lg shadow-lg w-[25vw]">
						<input
							onChange={handleInputChange}
							type="text"
							placeholder="Problem ID"
							name="id"
							className="p-2 border rounded"
						/>
						<input
							onChange={handleInputChange}
							type="text"
							placeholder="Title"
							name="title"
							className="p-2 border rounded"
						/>
						<input 
							onChange={handleInputChange} 
							type="text" 
							placeholder="difficulty" 
							name="difficulty"
							className="p-2 border rounded"
						/>
						<input
						 	onChange={handleInputChange} 
							type="text" 
							placeholder="category"
							name="category" 
							className="p-2 border rounded"
						/>
						<input 
							onChange={handleInputChange} 
							type="text" 
							placeholder="order" 
							name="order"
							className="p-2 border rounded"
						/>
						<input 
							onChange={handleInputChange} 
							type="text" 
							placeholder="videoId?" 
							name="videoId"
							className="p-2 border rounded"
						/>
						<input 
							onChange={handleInputChange} 
							type="text" 
							placeholder="link?" 
							name="link"
							className="p-2 border rounded"
						/>
						<button className="bg-brand-orange text-white py-2 px-4 rounded">
							שמירה למאגר בעיות
						</button>
					</form>
				</div>
			</main>
		</>
	);
}
