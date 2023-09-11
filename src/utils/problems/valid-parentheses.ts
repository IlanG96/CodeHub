import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeValidParenthesesJS = `function validParentheses(s) {
  // Write your JavaScript code here
};`;

const starterCodeValidParenthesesPython = `# Do not edit function name
def validParentheses(s):
    # Write your Python code here
    pass`;

const starterCodeValidParenthesesCPP = `// Do not edit function name
bool validParentheses(string s) {
    // Write your C++ code here
    return false;
}`;

const starterCodeValidParenthesesJava = `// Do not edit function name
public boolean validParentheses(String s) {
    // Write your Java code here
    return false;
}`;

export const validParenthesesHandler = (fn: any) => {
	try {
		const tests = ["()", "()[]{}", "(]", "([)]", "{[]}"];
		const answers = [true, true, false, false, true];
		for (let i = 0; i < tests.length; i++) {
			const result = fn(tests[i]);
			assert.deepEqual(result, answers[i]);
		}
		return true;
	} catch (error: any) {
		console.error("Error from validParenthesesHandler: ", error);
		throw new Error(error);
	}
};

export const validParentheses: Problem = {
	id: "valid-parentheses",
	title: "4. Valid Parentheses",
	order: 4,
	problemStatement: `
		<p class='mt-3'>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p> 
		<p class='mt-3'>An input string is valid if:</p> 
		<ul> 
			<li class='mt-2'>Open brackets must be closed by the same type of brackets.</li> 
			<li class='mt-3'>Open brackets must be closed in the correct order.</li>
			<li class="mt-3">Every close bracket has a corresponding open bracket of the same type. </li>
		</ul>`,
	examples: [
		{
			id: 0,
			inputText: 's = "()"',
			outputText: "true",
		},
		{
			id: 1,
			inputText: 's = "()[]{}"',
			outputText: "true",
		},
		{
			id: 2,
			inputText: 's = "(]"',
			outputText: "false",
		},
		{
			id: 3,
			inputText: 's = "([)]"',
			outputText: "false",
		},
	],
	constraints: `
		<li class='mt-2'><code>1 <= s.length <= 10<sup>4</sup></code></li>
		<li class='mt-2 '><code>s</code> consists of parentheses only <code class="text-md">'()[]{}'</code>.</li>`,
	handlerFunction: validParenthesesHandler,
	starterCode: {
		javascript: starterCodeValidParenthesesJS,
		python: starterCodeValidParenthesesPython,
		cpp: starterCodeValidParenthesesCPP,
		java: starterCodeValidParenthesesJava,
	},
	starterFunctionName: "function validParentheses(",
};
