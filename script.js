// 页面切换功能
function showPage(pageId) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示选中的页面
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // 更新导航激活状态
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.nav-item').classList.add('active');
    
    // 更新页面标题
    const titles = {
        'dashboard': '控制台',
        'image-reconstruction': '农田影像重建',
        'farmland-planning': '农田规划',
        'info-archive': '农田信息存档',
        'leveling': '平整监测',
        'seedling': '出苗分析',
        'patrol': '高效巡田',
        'growth': '长势监测',
        'yield': '产量预估',
        'variable-fertilizer': '稻麦变量施肥',
        'variable-weeding': '变量除草',
        'cotton-control': '棉花化控',
        'orchard-survey': '果园航测',
        '3d-route': '平台三维航线',
        'mountain-operation': '山地果园作业',
        'data-trace': '作业数据回溯',
        'realtime-monitor': '农机实时监管',
        'quality-control': '作业质量监管'
    };
    
    document.getElementById('page-title').textContent = titles[pageId] || '控制台';
    
    // 初始化对应页面的Canvas
    initializeCanvas(pageId);
}

// 初始化Canvas
function initializeCanvas(pageId) {
    const canvasMap = {
        'leveling': 'levelingCanvas',
        'seedling': 'seedlingCanvas',
        'patrol': 'patrolCanvas',
        'growth': 'ndviCanvas',
        'yield': 'yieldCanvas',
        'variable-fertilizer': 'prescriptionCanvas',
        'variable-weeding': 'weedCanvas',
        'cotton-control': 'cottonCanvas',
        'orchard-survey': 'orchardCanvas',
        '3d-route': 'route3DCanvas',
        'mountain-operation': 'mountainCanvas',
        'realtime-monitor': 'realtimeCanvas'
    };
    
    const canvasId = canvasMap[pageId];
    if (canvasId) {
        drawDemoCanvas(canvasId);
    }
}

// 绘制演示Canvas
function drawDemoCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    // 绘制渐变背景
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // 根据不同canvas绘制不同内容
    if (canvasId === 'levelingCanvas') {
        drawLevelingMap(ctx, width, height);
    } else if (canvasId === 'seedlingCanvas') {
        drawSeedlingMap(ctx, width, height);
    } else if (canvasId === 'patrolCanvas') {
        drawPatrolMap(ctx, width, height);
    } else if (canvasId === 'ndviCanvas') {
        drawNDVIMap(ctx, width, height);
    } else if (canvasId === 'yieldCanvas') {
        drawYieldMap(ctx, width, height);
    } else if (canvasId === 'prescriptionCanvas') {
        drawPrescriptionMap(ctx, width, height);
    } else if (canvasId === 'weedCanvas') {
        drawWeedMap(ctx, width, height);
    } else if (canvasId === 'cottonCanvas') {
        drawCottonMap(ctx, width, height);
    } else if (canvasId === 'orchardCanvas' || canvasId === 'route3DCanvas' || canvasId === 'mountainCanvas') {
        draw3DMap(ctx, width, height);
    } else if (canvasId === 'realtimeCanvas') {
        drawRealtimeMap(ctx, width, height);
    }
    
    // 添加网格
    drawGrid(ctx, width, height);
    
    // 添加文字说明
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 24px Microsoft YaHei';
    ctx.textAlign = 'center';
    ctx.fillText('地图数据加载中...', width / 2, height / 2);
    ctx.font = '16px Microsoft YaHei';
    ctx.fillText('实际使用时将显示真实地图数据', width / 2, height / 2 + 35);
}

// 绘制网格
function drawGrid(ctx, width, height) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    // 垂直线
    for (let x = 0; x < width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    // 水平线
    for (let y = 0; y < height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}

// 绘制平整监测地图
function drawLevelingMap(ctx, width, height) {
    const colors = ['#d73027', '#fc8d59', '#fee090', '#e0f3f8', '#91bfdb', '#4575b4'];
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = 30 + Math.random() * 50;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 绘制出苗分析地图
function drawSeedlingMap(ctx, width, height) {
    ctx.fillStyle = 'rgba(46, 204, 113, 0.3)';
    const rows = 15;
    const cols = 20;
    const cellWidth = width / cols;
    const cellHeight = height / rows;
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (Math.random() > 0.1) {
                ctx.beginPath();
                ctx.arc(
                    j * cellWidth + cellWidth / 2,
                    i * cellHeight + cellHeight / 2,
                    5,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            }
        }
    }
}

// 绘制巡田地图
function drawPatrolMap(ctx, width, height) {
    const diseaseSpots = [
        { x: 200, y: 150, severity: 'severe', radius: 60 },
        { x: 500, y: 300, severity: 'moderate', radius: 45 },
        { x: 700, y: 200, severity: 'mild', radius: 30 }
    ];
    
    const colorMap = {
        'severe': '#e74c3c',
        'moderate': '#f39c12',
        'mild': '#3498db'
    };
    
    diseaseSpots.forEach(spot => {
        const gradient = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, spot.radius);
        gradient.addColorStop(0, colorMap[spot.severity]);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(spot.x, spot.y, spot.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

// 绘制NDVI地图
function drawNDVIMap(ctx, width, height) {
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            const ndvi = Math.sin(x / 50) * Math.cos(y / 50) * 0.5 + 0.5;
            
            if (ndvi > 0.7) {
                data[index] = 0; data[index + 1] = 150; data[index + 2] = 0;
            } else if (ndvi > 0.5) {
                data[index] = 100; data[index + 1] = 200; data[index + 2] = 0;
            } else if (ndvi > 0.3) {
                data[index] = 200; data[index + 1] = 200; data[index + 2] = 0;
            } else {
                data[index] = 200; data[index + 1] = 100; data[index + 2] = 0;
            }
            data[index + 3] = 180;
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
}

// 绘制产量地图
function drawYieldMap(ctx, width, height) {
    const colors = ['#006837', '#31a354', '#78c679', '#c2e699', '#ffffcc'];
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = 40 + Math.random() * 60;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 绘制处方图
function drawPrescriptionMap(ctx, width, height) {
    const colors = ['#d73027', '#fc8d59', '#fee090', '#e0f3f8', '#91bfdb'];
    const gridSize = 80;
    
    for (let y = 0; y < height; y += gridSize) {
        for (let x = 0; x < width; x += gridSize) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            ctx.fillStyle = color + '80';
            ctx.fillRect(x, y, gridSize, gridSize);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.strokeRect(x, y, gridSize, gridSize);
        }
    }
}

// 绘制杂草地图
function drawWeedMap(ctx, width, height) {
    const weedAreas = [
        { x: 150, y: 100, size: 80, density: 'high' },
        { x: 400, y: 250, size: 60, density: 'medium' },
        { x: 650, y: 180, size: 50, density: 'low' }
    ];
    
    const colorMap = {
        'high': '#8b0000',
        'medium': '#ff4500',
        'low': '#ffa500'
    };
    
    weedAreas.forEach(area => {
        ctx.fillStyle = colorMap[area.density] + '80';
        ctx.fillRect(area.x - area.size/2, area.y - area.size/2, area.size, area.size);
    });
}

// 绘制棉花地图
function drawCottonMap(ctx, width, height) {
    drawPrescriptionMap(ctx, width, height);
}

// 绘制3D地图
function draw3DMap(ctx, width, height) {
    // 绘制山地轮廓
    ctx.fillStyle = 'rgba(139, 69, 19, 0.3)';
    ctx.beginPath();
    ctx.moveTo(0, height);
    for (let x = 0; x < width; x += 20) {
        const y = height - Math.sin(x / 100) * 150 - Math.random() * 50 - 200;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();
    
    // 绘制航线
    ctx.strokeStyle = 'rgba(255, 255, 0, 0.8)';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.moveTo(50, height - 250);
    for (let x = 50; x < width - 50; x += 50) {
        const y = height - 250 - Math.sin(x / 100) * 50;
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);
}

// 绘制实时监控地图
function drawRealtimeMap(ctx, width, height) {
    // 绘制地块
    ctx.fillStyle = 'rgba(46, 204, 113, 0.2)';
    ctx.fillRect(100, 100, 300, 200);
    ctx.fillRect(450, 150, 250, 180);
    ctx.fillRect(150, 350, 280, 150);
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.strokeRect(100, 100, 300, 200);
    ctx.strokeRect(450, 150, 250, 180);
    ctx.strokeRect(150, 350, 280, 150);
    
    // 绘制设备位置
    const devices = [
        { x: 250, y: 200, status: 'working' },
        { x: 575, y: 240, status: 'working' },
        { x: 290, y: 425, status: 'standby' }
    ];
    
    devices.forEach(device => {
        const color = device.status === 'working' ? '#2ecc71' : '#f39c12';
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(device.x, device.y, 10, 0, Math.PI * 2);
        ctx.fill();
        
        // 绘制脉冲效果
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(device.x, device.y, 20, 0, Math.PI * 2);
        ctx.stroke();
    });
}

// 农田影像重建功能
function startImageReconstruction() {
    alert('开始新建影像重建任务...\n请配置航测参数后点击"开始影像重建"按钮');
}

function executeReconstruction() {
    const field = document.querySelector('#field-select').value;
    alert(`正在执行影像重建任务...\n地块：${field}\n预计需要15-20分钟完成处理`);
    
    // 模拟进度
    setTimeout(() => {
        alert('影像重建完成！\n已生成高清正射影像图');
    }, 2000);
}

function viewImage() {
    alert('正在加载高清影像...\n实际使用时将显示完整的正射影像图');
}

// 农田规划功能
function createNewField() {
    alert('开始创建新地块...\n请在地图上绘制地块边界或使用AI自动识别功能');
}

// 档案切换
function switchArchiveTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.archive-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    event.target.classList.add('active');
    document.getElementById('archive-' + tabName).classList.add('active');
}

// 平整监测功能
function startLeveling() {
    alert('开始平整监测...\n正在分析地形数据');
    drawDemoCanvas('levelingCanvas');
}

// 出苗分析功能
function analyzeSeedling() {
    alert('开始出苗分析...\n正在使用AI识别出苗情况');
    drawDemoCanvas('seedlingCanvas');
}

// 巡田功能
function startPatrol() {
    alert('开始高效巡田...\n正在使用AI识别病虫害');
    drawDemoCanvas('patrolCanvas');
}

// 长势监测功能
function analyzeGrowth() {
    alert('开始长势监测...\n正在生成NDVI植被指数图');
    drawDemoCanvas('ndviCanvas');
    
    // 绘制趋势图
    setTimeout(() => {
        drawTrendChart();
        drawDistributionChart();
    }, 500);
}

function drawTrendChart() {
    const canvas = document.getElementById('trendChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, width, height);
    
    // 绘制折线图
    ctx.strokeStyle = '#2ecc71';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const data = [0.45, 0.52, 0.58, 0.65, 0.68, 0.72, 0.71];
    const step = width / (data.length - 1);
    
    data.forEach((value, index) => {
        const x = index * step;
        const y = height - (value * height);
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // 绘制数据点
    ctx.fillStyle = '#2ecc71';
    data.forEach((value, index) => {
        const x = index * step;
        const y = height - (value * height);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawDistributionChart() {
    const canvas = document.getElementById('distributionChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, width, height);
    
    // 绘制饼图
    const data = [
        { value: 71, color: '#2ecc71', label: '优良' },
        { value: 22, color: '#f39c12', label: '正常' },
        { value: 7, color: '#e74c3c', label: '较弱' }
    ];
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;
    
    let currentAngle = -Math.PI / 2;
    
    data.forEach(item => {
        const sliceAngle = (item.value / 100) * Math.PI * 2;
        
        ctx.fillStyle = item.color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();
        
        currentAngle += sliceAngle;
    });
}

// 产量预估功能
function estimateYield() {
    alert('开始产量预估...\n正在使用AI自动数穗并计算产量');
    drawDemoCanvas('yieldCanvas');
}

// 变量施肥功能
function generatePrescription() {
    alert('正在生成处方图...\n基于NDVI数据分析长势差异');
    drawDemoCanvas('prescriptionCanvas');
    
    setTimeout(() => {
        alert('处方图生成完成！\n预计节省肥料17%，节省成本¥426');
    }, 1500);
}

// 变量除草功能
function generateWeedingPlan() {
    alert('正在生成除草方案...\n使用AI识别杂草分布');
    drawDemoCanvas('weedCanvas');
}

// 棉花化控功能
function generateCottonControl() {
    alert('正在生成化控方案...\n分析棉花株高差异');
    drawDemoCanvas('cottonCanvas');
}

// 果园航测功能
function startOrchardSurvey() {
    alert('开始果园航测...\n正在生成三维航测任务');
    drawDemoCanvas('orchardCanvas');
}

// 三维航线功能
function create3DRoute() {
    alert('开始创建三维航线...\n请配置航线参数');
}

// 山地作业功能
function startMountainOperation() {
    alert('开始山地果园作业...\n设备正在执行三维航线');
    drawDemoCanvas('mountainCanvas');
}

// 数据回溯功能
function viewTraceDetail(id) {
    alert(`查看作业详情 #${id}\n\n作业时间：2024-11-24 14:30\n作业类型：变量施肥\n地块：A区-01\n作业面积：45.6亩\n设备：T40-01\n操作员：张三\n用量：尿素 120kg\n\n作业轨迹、参数记录完整`);
}

// 添加质量规则
function addQualityRule() {
    alert('添加新的监管规则...\n请配置作业标准参数');
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 默认显示控制台
    showPage('dashboard');
    
    // 绘制控制台地图
    const dashboardMap = document.getElementById('realtime-map');
    if (dashboardMap) {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 400;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.borderRadius = '8px';
        dashboardMap.innerHTML = '';
        dashboardMap.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        drawRealtimeMap(ctx, canvas.width, canvas.height);
    }
    
    // 添加导航点击事件
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const pageId = href.substring(1);
                showPage(pageId);
            }
        });
    });
    
    // 模拟实时数据更新
    setInterval(updateRealtimeData, 5000);
});

// 更新实时数据
function updateRealtimeData() {
    // 更新设备电量
    const batteries = document.querySelectorAll('.device-card .device-info p');
    batteries.forEach(p => {
        if (p.textContent.includes('电量')) {
            const currentBattery = parseInt(p.textContent);
            if (!isNaN(currentBattery) && currentBattery > 10) {
                const newBattery = Math.max(10, currentBattery - Math.floor(Math.random() * 3));
                p.innerHTML = p.innerHTML.replace(/\d+%/, newBattery + '%');
            }
        }
    });
    
    // 更新作业进度
    const progresses = document.querySelectorAll('.device-card .device-info p');
    progresses.forEach(p => {
        if (p.textContent.includes('进度')) {
            const currentProgress = parseInt(p.textContent);
            if (!isNaN(currentProgress) && currentProgress < 100) {
                const newProgress = Math.min(100, currentProgress + Math.floor(Math.random() * 5));
                p.innerHTML = p.innerHTML.replace(/\d+%/, newProgress + '%');
            }
        }
    });
}

// 模拟地图交互
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'CANVAS') {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        console.log(`地图点击位置: (${Math.round(x)}, ${Math.round(y)})`);
        
        // 可以在这里添加更多交互功能
        // 例如：显示该位置的详细信息、添加标记等
    }
});

// 表单验证
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;
    
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// 导出数据功能
function exportData(type) {
    alert(`正在导出${type}数据...\n文件将保存为Excel格式`);
    
    // 实际使用时这里应该调用后端API导出数据
    setTimeout(() => {
        alert('数据导出完成！');
    }, 1000);
}

// 打印报告功能
function printReport() {
    window.print();
}

// 搜索功能
function searchData(keyword) {
    console.log('搜索关键词:', keyword);
    // 实际使用时这里应该实现搜索逻辑
}

// 通知功能
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    // Ctrl + S 保存
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        showNotification('数据已保存', 'success');
    }
    
    // Ctrl + P 打印
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        printReport();
    }
    
    // Ctrl + F 搜索
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// 页面加载完成提示
window.addEventListener('load', function() {
    console.log('智慧农业管理平台加载完成');
    console.log('版本: 1.0.0');
    console.log('功能模块: 农田管理、智能巡田、变量作业、三维航线、数据监管');
});
