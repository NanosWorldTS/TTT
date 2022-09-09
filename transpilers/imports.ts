
import * as ts from "typescript";
import * as tstl from "typescript-to-lua";
//@ts-ignore
console.log("Imports transpiller starting");

let importMapsCount = 0;

const plugin: tstl.Plugin = {
    visitors: {
        [ts.SyntaxKind.ImportDeclaration]: (node) => {
            // Find the name of the package
            const identifier = (node.moduleSpecifier as any).text; // Any => They hack the types so I hack the types too
            if (identifier.toLowerCase().includes("nanosts")) {
                return [];
            }

            ++importMapsCount;
            const importMapName = "____importmap_"+importMapsCount;
            // TODO: Handle default imports ( import test from "./test")
            // TODO: Handle external Lua package with type definitions

            const targetModulePath = identifier + ".lua";

            // List all the imports done
            const namedBindings = (node.importClause?.namedBindings as any).elements
            const importedVariables = namedBindings?.map((chNode) => chNode.getText());

            // Create LUA AST Nodes
            const packageRequireAssignToImportMap = tstl.createVariableDeclarationStatement(tstl.createIdentifier(importMapName), tstl.createIdentifier(`Package.Require("${targetModulePath}")`))
            const finalNamedImportsVariables = importedVariables.map((varName) => {
                return tstl.createVariableDeclarationStatement(tstl.createIdentifier(varName), tstl.createIdentifier(importMapName + "." + varName))
            })
            return [packageRequireAssignToImportMap, ...finalNamedImportsVariables];
        },
    }
}
//@ts-ignore
console.log("Imports transpiller done");

export default plugin;