# [Project Name] Migration Plan
# [專案名稱] 遷移計畫

**Document Version | 文件版本**: 1.0
**Created | 建立日期**: YYYY-MM-DD
**Last Updated | 最後更新**: YYYY-MM-DD
**Source System | 來源系統**: [e.g., PHP/Fat-Free Framework]
**Target System | 目標系統**: [e.g., .NET 10]

---

## Purpose | 目的

This template provides a structured approach for technology migration projects, ensuring systematic planning, execution, and verification.

本範本提供技術遷移專案的結構化方法，確保系統性的規劃、執行與驗證。

---

## 1. Migration Overview | 遷移概述

### 1.1 Project Summary | 專案摘要

<!-- TODO: 1-2 段說明遷移的背景與目標 -->

**Why Migrate | 為何遷移**:
- [Reason 1: e.g., End of framework support]
- [Reason 2: e.g., Performance improvements needed]
- [Reason 3: e.g., Team expertise shift]

**Migration Scope | 遷移範圍**:
- [Module/Feature 1]
- [Module/Feature 2]
- [Module/Feature 3]

**Out of Scope | 不在範圍內**:
- [Item 1]
- [Item 2]

### 1.2 System Comparison | 系統對比

| Aspect | Source System | Target System |
|--------|---------------|---------------|
| **Language** | [e.g., PHP 8.2] | [e.g., C# 12] |
| **Framework** | [e.g., Fat-Free 3.8] | [e.g., ASP.NET Core 10] |
| **Database** | [e.g., MySQL 8.0] | [e.g., SQL Server 2022] |
| **ORM** | [e.g., Cortex] | [e.g., Entity Framework Core] |
| **Authentication** | [e.g., Custom JWT] | [e.g., ASP.NET Identity] |
| **Hosting** | [e.g., Apache] | [e.g., Docker/Kubernetes] |

### 1.3 Success Criteria | 成功標準

<!-- TODO: 定義遷移成功的可量化標準 -->

- [ ] All critical features migrated and functional
- [ ] Performance metrics meet or exceed baseline
- [ ] Zero data loss during migration
- [ ] Security audit passed
- [ ] User acceptance testing completed

---

## 2. Five-Phase Migration Roadmap | 五階段遷移路線圖

### Phase 1: Assessment & Planning | 評估與規劃

**Duration | 時程**: [X weeks]

**Objectives | 目標**:
- Inventory existing system components
- Identify dependencies and integrations
- Define migration strategy (Big Bang vs. Strangler Fig)
- Establish success metrics

**Deliverables | 交付項目**:
- [ ] System inventory document
- [ ] Dependency mapping diagram
- [ ] Risk assessment report
- [ ] Migration strategy document

**Key Activities | 主要活動**:

| Activity | Owner | Status |
|----------|-------|--------|
| Code audit and analysis | [Name] | [ ] |
| Database schema review | [Name] | [ ] |
| API endpoint inventory | [Name] | [ ] |
| Third-party integration review | [Name] | [ ] |

---

### Phase 2: Environment Setup | 環境建置

**Duration | 時程**: [X weeks]

**Objectives | 目標**:
- Set up target development environment
- Configure CI/CD pipelines
- Establish coding standards
- Create project scaffolding

**Deliverables | 交付項目**:
- [ ] Development environment ready
- [ ] CI/CD pipeline configured
- [ ] Coding standards documented
- [ ] Project template created

**Environment Checklist | 環境檢查清單**:

| Environment | URL/Location | Status |
|-------------|--------------|--------|
| Development | [URL] | [ ] |
| Staging | [URL] | [ ] |
| Production | [URL] | [ ] |
| CI/CD | [URL] | [ ] |

---

### Phase 3: Core Migration | 核心遷移

**Duration | 時程**: [X weeks]

**Objectives | 目標**:
- Migrate core business logic
- Migrate database schema and data
- Implement authentication/authorization
- Migrate critical APIs

**Migration Order | 遷移順序**:

| Priority | Module | Complexity | Dependencies |
|----------|--------|------------|--------------|
| 1 | [Core Module] | High | None |
| 2 | [Auth Module] | Medium | Core |
| 3 | [Feature A] | Medium | Core, Auth |
| 4 | [Feature B] | Low | Core |

**Database Migration Steps | 資料庫遷移步驟**:

1. [ ] Export source database schema
2. [ ] Convert schema to target format
3. [ ] Create migration scripts
4. [ ] Set up data transformation ETL
5. [ ] Validate data integrity

---

### Phase 4: Integration & Testing | 整合與測試

**Duration | 時程**: [X weeks]

**Objectives | 目標**:
- Integrate migrated components
- Execute comprehensive testing
- Perform security audit
- Conduct performance testing

**Testing Checklist | 測試檢查清單**:

| Test Type | Coverage Target | Status |
|-----------|-----------------|--------|
| Unit Tests | > 80% | [ ] |
| Integration Tests | All APIs | [ ] |
| E2E Tests | Critical paths | [ ] |
| Performance Tests | Baseline comparison | [ ] |
| Security Tests | OWASP Top 10 | [ ] |
| UAT | All features | [ ] |

**Performance Baseline Comparison | 效能基準比較**:

| Metric | Source System | Target System | Status |
|--------|---------------|---------------|--------|
| API Response Time (p95) | [X]ms | [Y]ms | [ ] |
| Database Query Time | [X]ms | [Y]ms | [ ] |
| Memory Usage | [X]MB | [Y]MB | [ ] |
| CPU Utilization | [X]% | [Y]% | [ ] |

---

### Phase 5: Deployment & Cutover | 部署與切換

**Duration | 時程**: [X weeks]

**Objectives | 目標**:
- Deploy to production
- Execute cutover plan
- Monitor system stability
- Decommission legacy system

**Cutover Checklist | 切換檢查清單**:

**Pre-Cutover | 切換前**:
- [ ] Final data sync completed
- [ ] All tests passed
- [ ] Rollback plan verified
- [ ] Team availability confirmed
- [ ] Customer notification sent

**Cutover | 切換中**:
- [ ] DNS/Load balancer switch
- [ ] Final data migration
- [ ] Service activation
- [ ] Smoke tests passed

**Post-Cutover | 切換後**:
- [ ] Monitor error rates
- [ ] Monitor performance metrics
- [ ] User feedback collection
- [ ] Legacy system decommission schedule

---

## 3. Rollback Plan | 回滾計畫

### 3.1 Rollback Triggers | 回滾觸發條件

| Trigger | Threshold | Action |
|---------|-----------|--------|
| Error Rate | > [X]% | Initiate rollback |
| Response Time | > [X]ms (p95) | Evaluate rollback |
| Data Inconsistency | Any | Immediate rollback |
| Security Breach | Any | Immediate rollback |

### 3.2 Rollback Steps | 回滾步驟

**Immediate Actions | 立即行動** (within 15 minutes):
1. [ ] Switch DNS/Load balancer back to legacy system
2. [ ] Disable new system endpoints
3. [ ] Notify stakeholders

**Data Recovery | 資料恢復** (within 1 hour):
1. [ ] Identify data changes during cutover window
2. [ ] Execute reverse data sync
3. [ ] Verify data integrity

**Post-Rollback | 回滾後**:
1. [ ] Conduct root cause analysis
2. [ ] Update migration plan
3. [ ] Schedule re-migration

### 3.3 Rollback Decision Matrix | 回滾決策矩陣

| Time Since Cutover | Data Changes | Recommended Action |
|--------------------|--------------|-------------------|
| < 1 hour | Minimal | Quick rollback |
| 1-4 hours | Moderate | Evaluate data sync effort |
| > 4 hours | Significant | Fix forward if possible |

---

## 4. Risk Management | 風險管理

### 4.1 Risk Register | 風險登記

| ID | Risk | Impact | Probability | Mitigation |
|----|------|--------|-------------|------------|
| R1 | Data loss during migration | High | Low | Multiple backups, dry runs |
| R2 | Performance degradation | Medium | Medium | Performance testing, optimization |
| R3 | Feature parity gaps | Medium | Medium | Comprehensive feature inventory |
| R4 | Extended downtime | High | Low | Parallel running, quick rollback |
| R5 | Team skill gaps | Medium | Medium | Training, pair programming |

### 4.2 Contingency Plans | 應變計畫

**R1: Data Loss**
- Maintain real-time replication during migration window
- Keep source database read-only during critical phase
- Store transaction logs for replay

**R2: Performance Issues**
- Pre-scale infrastructure for migration
- Have database optimization scripts ready
- Prepare CDN configuration for quick activation

---

## 5. Verification Checklist | 驗證檢查清單

### 5.1 Functional Verification | 功能驗證

| Feature | Source Behavior | Target Behavior | Verified |
|---------|-----------------|-----------------|----------|
| [Feature 1] | [Description] | [Expected same/different] | [ ] |
| [Feature 2] | [Description] | [Expected same/different] | [ ] |
| [Feature 3] | [Description] | [Expected same/different] | [ ] |

### 5.2 Data Verification | 資料驗證

| Data Set | Record Count (Source) | Record Count (Target) | Checksum Match |
|----------|----------------------|----------------------|----------------|
| Users | [X] | [Y] | [ ] |
| Transactions | [X] | [Y] | [ ] |
| Configurations | [X] | [Y] | [ ] |

### 5.3 Integration Verification | 整合驗證

| External System | Integration Type | Verified |
|-----------------|-----------------|----------|
| [System A] | API | [ ] |
| [System B] | Database | [ ] |
| [System C] | Message Queue | [ ] |

---

## 6. Communication Plan | 溝通計畫

### 6.1 Stakeholder Notification | 利害關係人通知

| Event | Recipients | Timing | Channel |
|-------|------------|--------|---------|
| Migration Start | All stakeholders | 1 week before | Email |
| Cutover Window | Technical team, Support | 24 hours before | Email, Slack |
| Cutover Complete | All stakeholders | Immediately | Email, Slack |
| Issues Detected | Technical team | Immediately | Slack, Phone |
| Rollback Initiated | All stakeholders | Immediately | Email, Slack |

### 6.2 Status Reporting | 狀態回報

| Report | Frequency | Audience |
|--------|-----------|----------|
| Daily Standup | Daily | Dev team |
| Weekly Summary | Weekly | Management |
| Phase Completion | Per phase | All stakeholders |

---

## 7. Post-Migration | 遷移後

### 7.1 Hypercare Period | 密切關注期

**Duration | 時程**: [X weeks]

**Monitoring Focus | 監控重點**:
- [ ] Error rates and types
- [ ] Performance metrics
- [ ] User feedback
- [ ] Support ticket volume

### 7.2 Legacy Decommission | 舊系統退役

| Task | Target Date | Status |
|------|-------------|--------|
| Disable legacy write access | [Date] | [ ] |
| Archive legacy database | [Date] | [ ] |
| Terminate legacy infrastructure | [Date] | [ ] |
| Update documentation | [Date] | [ ] |

### 7.3 Lessons Learned | 經驗學習

<!-- TODO: 遷移完成後填寫 -->

**What Went Well | 順利之處**:
- [Item 1]
- [Item 2]

**What Could Be Improved | 可改進之處**:
- [Item 1]
- [Item 2]

**Recommendations for Future Migrations | 未來遷移建議**:
- [Recommendation 1]
- [Recommendation 2]

---

## Appendix | 附錄

### A. Architecture Diagrams | 架構圖

<!-- TODO: 插入架構圖 -->

### B. API Mapping | API 對應表

| Source Endpoint | Target Endpoint | Notes |
|-----------------|-----------------|-------|
| `GET /api/users` | `GET /api/v2/users` | Response format changed |
| `POST /api/login` | `POST /api/auth/login` | Added refresh token |

### C. Database Schema Mapping | 資料庫結構對應

| Source Table | Target Table | Transformation |
|--------------|--------------|----------------|
| `users` | `Users` | Column renames, type changes |
| `orders` | `Orders` | Split into Orders + OrderItems |

---

## Related Standards | 相關標準

- [Testing Standards](../core/testing-standards.md) - 測試標準
- [Code Check-in Standards](../core/checkin-standards.md) - 程式碼簽入檢查點標準
- [Documentation Structure](../core/documentation-structure.md) - 文件結構標準

---

## Version History | 版本歷史

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-22 | Initial migration template |

---

## License | 授權

This template is released under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

本範本以 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 授權發布。
