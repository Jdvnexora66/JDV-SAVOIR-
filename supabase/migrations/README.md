# Supabase migration history — JDV Savoir+

Project: `veqmwnobwteqyiottrmw` (`jdv-savoir-plus`, eu-west-1)

The database currently reports the following applied migrations. Historical SQL files were not present in the repository at the time of this audit; this manifest records the live history to prevent silent drift. Recover and commit the original SQL files from the migration source before treating this repository as a complete reproducible database baseline.

| Version | Applied migration |
|---|---|
| 20261030044003 | jdv_savoir_plus_initial_schema |
| 20261030044010 | seed_benin_and_api_grants |
| 20261030044032 | refine_rls_and_add_foreign_key_indexes |
| 20261030044038 | seed_benin_education_catalogue |
| 20261030044059 | configure_jdv_storage_buckets_and_access |
| 20261030044949 | shared_web_mobile_auth_and_learning_features |
| 20261030045417 | optimize_settings_rls_and_quiz_indexes |
| 20261030052502 | calendar_document_purchases_analytics |
| 20261030052504 | secure_document_purchases_and_role_scopes |
| 20261030052518 | revoke_anonymous_purchase_and_role_rpc |
| 20261030052603 | scope_metrics_without_helper_rpc |
| 20261030052609 | restrict_content_management_roles |
| 20261030052613 | correct_content_role_write_policy_scopes |
| 20261030052738 | restrict_trigger_function_execution |
| 20261030052815 | index_document_purchase_foreign_keys |
| 20261030054547 | expand_benin_education_catalogue_and_sources |
| 20261030054655 | seed_technical_higher_and_continuing_programmes |
| 20261030054724 | link_courses_to_national_programmes |
| 20261030054736 | index_education_catalogue_foreign_keys |
| 20261031021603 | bookstore_and_paid_library |
| 20261031064359 | index_remaining_catalogue_purchase_foreign_keys |
| 20261031071006 | optimize_bookstore_and_entitlement_rls |

## Synchronization rule

- Never edit production schema manually without a versioned migration.
- Apply the migration to the dedicated Supabase project, then verify its version appears in `supabase_migrations.schema_migrations`.
- Regenerate `src/database.types.ts` from the live schema and commit it with the migration.
- Compare the live migration list with filenames in this directory before each release.
- Keep the NEXORA project and its migration history separate.
