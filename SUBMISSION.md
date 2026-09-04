# Submission

## What did you investigate first, and why?
I first investigated why the review-report.md was not being filled with expected information and why the validation output of the CLI commands was being dumped in the console. 

## What did you choose to implement or fix?
I chose to address three quality attributes as best I could. These being: reliability, robustness, and maintainability. 
This resulted in first making fixes to the program to address issues I encountered while trying to run the CLI with my test repo.
I wanted the changes I made to contribute to the functionality of the program without posing as hurdles to additional pushes made down the line.
I ultimately made coding changes to four files.

## What did you intentionally not do?
I intentionally did not make modifications to core.ts because of the limited time frame and the need to make architectural decisions that would need to be more thoughtful. 

## Interface decision

- Decision: CLI-first / MCP-first / hybrid
	Hybrid
- Primary user and execution environment:
	Software developers using the CLI in a local terminal and AI agents using MCP.
- Trust boundary and allowed capabilities:
	File and git access is limited to the target repository path. 
- Reliability, discoverability, latency/context, and output tradeoffs:
	Cons: Priotizing shared logic for the CLI and MCP layers that results in additional overhead and a slight increase to potential latency/context.
	Pros: It provides additional reliability through maintainability and consistent output.
- How supported interfaces remain consistent:
	Both cli.ts and mcp-server.ts maintain similar stucture and function calls to eventually be usable by core.ts without the need for cascading modificiations.
- Evidence that would change this decision:
	If data collected from users indicated a high favorability by either MCP or CLI users, this would result in a drive to change the architecture to match.

## How did you use an AI coding agent?
I used an AI coding agent to suggest changes and write syntax so I could focus on decision making.

## Where did you check, correct, or reject an AI suggestion? (required)
I rejected a suggestion to rethrow errors in validation.ts because I wanted any output to be contained in the report file.

## Commands used to verify the result, with outcomes

npm run typecheck —> Pass
npm test —> Pass
npm run inspector -- review --repo ./path/to/repo --format markdown —> Executes without error
npm run inspector -- review --repo ./path/to/repo --validate "npm test" -> Executes without error and now properly directs the output to the report file
npx @modelcontextprotocol/inspector npx tsx src/mcp-server.ts —> Pass + connects and runs without dropping

## A blocker you hit and how you approached it
Blocker: I hit a blocker when attempting th run the inspector against test repositories that lacked configured test scripts.
Solution: I created a simple test script for the test repository to serve as example input for the repo inspector.

## Known limitations and the next three things you would do
1. Security risks: I would add additional checks for the mcp-server to impose more restrictions on the exeternal commands that can be executed.
2. The hybrid approach has not been fully imeplemented. I want to ensure consistency across the MCP and CLI interfaces to be used by the core.
3. Make additional unit tests to catch potential edge cases.

## Approximate focused-work time

- Start: 8:18
- Finish: 9:44
