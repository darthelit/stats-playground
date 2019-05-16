# unified-rules-ui
One Rules UI to rule them all.

## Dev Notes
We will need three ocelot routes for this pointing at the same cf app.
`/rule-sets` - for rendering rule set pages
`/rule-books` - for rendering rule book pages
`/unified-rules` - for retrieving resources (i.e. css, scripts, etc)

## Required Env Vars
    NODE_ENV
    CF_ENV
    HOST
    RULES_V3_PATH
    RULE_SETS_V1_PATH
    RULE_BOOKS_V1_PATH
    RESTRICTED_ACCESS_PATH
    COOKIE_NAME
    RULES_ENV