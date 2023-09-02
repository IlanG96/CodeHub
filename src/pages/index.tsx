import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import useHasMounted from "@/hooks/useHasMounted";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebase";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";


async function getdisplayName(id: string) {
	const docRef = doc(firestore, "users", id);
	const docSnap = await getDoc(docRef);
	const displayName = docSnap.get("displayName");
	return displayName;
}


export default function Home() {
	const [loadingProblems, setLoadingProblems] = useState(true);
	const hasMounted = useHasMounted();
	const [user] = useAuthState(auth);
	const [displayName, setdisplayName] = useState("");
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
		// Fetch and set the display name when the user changes
		const fetchDisplayName = async () => {
		  if (user) {
			const displayName = await getdisplayName(user.uid);
			setdisplayName(displayName);
		  }
		};
	
		fetchDisplayName();
	  }, [user]);

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

	if (!hasMounted) return null;

	//סידור טקסט אם המשתמש רשם את השם שלו באנגלית אז צריך שזה יוצג שונה
	function isHebrew(name : string) {
		const hebrewRegex = /[\u0590-\u05FF]/;
		return hebrewRegex.test(name);
	}
	return (
		<>
			<main className='bg-dark-layer-2 min-h-screen'>
				<Topbar />
				{user ? (
					<h1
					className='text-2xl text-center text-gray-700 dark:text-gray-400 font-medium
					uppercase mt-10 mb-5'
					>
						
			    		{isHebrew(displayName) ? (
      						<>👇 שלום {displayName} תהנה ממגוון הבעיות שיש לנו להציע</>
    					) : (
     						 <>👇 תהנה ממגוון הבעיות שיש לנו להציע  {displayName} שלום</>
    					)}			
						
					</h1>
				) : (

					<h1
					className='text-2xl text-center text-gray-700 dark:text-gray-400 font-medium
					uppercase mt-10 mb-5'
					>
						👇 הירשמו בשביל להנות ממגוון רחב של בעיות שיש לנו להציע CodeHubברוך הבא ל 
					</h1>
				)}
				<div className='relative overflow-x-auto mx-auto px-6 pb-10'>
					{loadingProblems && (
						<div className='max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse'>
							{[...Array(10)].map((_, idx) => (
								<LoadingSkeleton key={idx} />
							))}
						</div>
					)}
					<table className='text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto'>
						{!loadingProblems && (
							<thead className='text-xs text-gray-700 uppercase dark:text-gray-400 border-b '>
								<tr>
									<th scope='col' className='px-1 py-3 w-0 font-medium'>
										סטטוס
									</th>
									<th scope='col' className='px-6 py-3 w-0 font-medium'>
										שם הבעיה
									</th>
									<th scope='col' className='px-6 py-3 w-0 font-medium'>
										רמת קושי
									</th>

									<th scope='col' className='px-6 py-3 w-0 font-medium'>
										קטגוריה
									</th>
									<th scope='col' className='px-6 py-3 w-0 font-medium'>
										פתרון
									</th>
								</tr>
							</thead>
						)}
						<ProblemsTable setLoadingProblems={setLoadingProblems} />
					</table>
				</div>


				<form className="p-6 flex flex-col max-w-sm gap-3" onSubmit={handleSubmit}>
					<input onChange={handleInputChange} type="text" placeholder="problem ID" name="id" />
					<input onChange={handleInputChange} type="text" placeholder="title" name="title" />
					<input onChange={handleInputChange} type="text" placeholder="difficulty" name="difficulty" />
					<input onChange={handleInputChange} type="text" placeholder="category" name="category" />
					<input onChange={handleInputChange} type="text" placeholder="order" name="order" />
					<input onChange={handleInputChange} type="text" placeholder="videoId?" name="videoId" />
					<input onChange={handleInputChange} type="text" placeholder="link?" name="link" />
					<button className="bg-white">Save to DB</button>
				</form>
			</main>
		</>
	);
}

const LoadingSkeleton = () => {
	return (
		<div className='flex items-center space-x-12 mt-4 px-6'>
			<div className='w-6 h-6 shrink-0 rounded-full bg-dark-layer-1'></div>
			<div className='h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1'></div>
			<div className='h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1'></div>
			<div className='h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1'></div>
			<span className='sr-only'>Loading...</span>
		</div>
	);
};
