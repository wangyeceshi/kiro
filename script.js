// 页面切换功能
function showPage(pageId, element) {
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

    // 如果有传递element参数，则激活对应的导航项
    if (element) {
        const navItem = element.closest('.nav-item');
        if (navItem) {
            navItem.classList.add('active');
        }
    } else {
        // 否则根据pageId查找对应的导航项
        const navItem = document.querySelector(`a[href="#${pageId}"]`);
        if (navItem) {
            navItem.classList.add('active');
        }
    }

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
        'data-trace': '作业数据回溯',
        'realtime-monitor': '农机实时监管',
        'quality-control': '作业质量监管',
        'pest-monitor': '病虫害监测',
        'device-connect': '设备连接管理'
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
        'realtime-monitor': 'realtimeCanvas'
    };

    const canvasId = canvasMap[pageId];
    if (canvasId) {
        drawDemoCanvas(canvasId);
    }

    // 初始化农田规划地图
    if (pageId === 'farmland-planning') {
        initFarmlandPlanningMap();
    }

    // 初始化平整监测地图
    if (pageId === 'leveling') {
        initLevelingMap();
    }

    // 初始化出苗分析地图
    if (pageId === 'seedling') {
        initSeedlingMap();
    }

    // 初始化病虫害监测地图
    if (pageId === 'pest-monitor') {
        initPestMonitorMap();
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
        ctx.fillRect(area.x - area.size / 2, area.y - area.size / 2, area.size, area.size);
    });
}

// 绘制棉花地图
function drawCottonMap(ctx, width, height) {
    drawPrescriptionMap(ctx, width, height);
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

// ============================================
// 平整监测功能
// ============================================

let levelingMap = null;
let levelingHeatLayer = null;
let levelingFieldPolygon = null;

// 初始化平整监测地图
function initLevelingMap() {
    const container = document.getElementById('leveling-map');
    if (!container) {
        console.error('平整监测地图容器不存在');
        return;
    }

    // 检查是否已经初始化
    if (levelingMap) {
        return;
    }

    try {
        // 创建地图实例 - 天津市宁河区农田（新区域中心点）
        levelingMap = L.map('leveling-map').setView([39.330131, 117.718475], 16);

        // 添加卫星地图图层（平整监测使用卫星图更直观）
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles © Esri',
            maxZoom: 19
        }).addTo(levelingMap);

        // 添加地块边界
        addLevelingField();

        console.log('✅ 平整监测地图初始化成功');

    } catch (error) {
        console.error('平整监测地图初始化失败:', error);
        container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f8f9fa; color: #e74c3c;"><span>地图初始化失败: ' + error.message + '</span></div>';
    }
}

// 添加地块
function addLevelingField() {
    const fieldCoords = [
        [39.331741, 117.715416],
        [39.328522, 117.715330],
        [39.328754, 117.721381],
        [39.331542, 117.721639]
    ];

    levelingFieldPolygon = L.polygon(fieldCoords, {
        color: '#2ecc71',
        fillColor: 'transparent',
        weight: 3,
        dashArray: '10, 5'
    }).addTo(levelingMap);

    levelingFieldPolygon.bindPopup('<strong>A区-01号地块</strong><br>面积：45.6亩');
}

// 生成高程热力图
function generateElevationMap() {
    if (!levelingMap) {
        showNotification('请先初始化地图', 'warning');
        return;
    }

    // 移除旧的热力图层
    if (levelingHeatLayer) {
        levelingMap.removeLayer(levelingHeatLayer);
    }

    showNotification('正在生成高程图...', 'info');

    // 模拟生成高程数据点
    const elevationData = generateElevationData();

    // 创建热力图层（使用矩形网格模拟）
    levelingHeatLayer = L.layerGroup();

    elevationData.forEach(point => {
        const color = getElevationColor(point.elevation);
        const size = 0.0003; // 网格大小

        const rectangle = L.rectangle([
            [point.lat - size, point.lng - size],
            [point.lat + size, point.lng + size]
        ], {
            color: color,
            fillColor: color,
            fillOpacity: 0.6,
            weight: 0
        }).addTo(levelingHeatLayer);

        rectangle.bindTooltip(`高程: ${point.elevation > 0 ? '+' : ''}${point.elevation.toFixed(2)}m`, {
            permanent: false,
            direction: 'top'
        });
    });

    levelingHeatLayer.addTo(levelingMap);

    // 更新分析结果
    updateLevelingResults(elevationData);

    showNotification('高程图生成完成！', 'success');
}

// 生成模拟高程数据
function generateElevationData() {
    const data = [];
    const baseElevation = 0;

    // 新地块范围
    const minLat = 39.328522;
    const maxLat = 39.331741;
    const minLng = 117.715330;
    const maxLng = 117.721639;

    // 在地块范围内生成网格点
    for (let lat = minLat; lat <= maxLat; lat += 0.0005) {
        for (let lng = minLng; lng <= maxLng; lng += 0.0005) {
            // 检查点是否在多边形内（简化判断）
            if (isPointInField(lat, lng)) {
                // 模拟地形：东北角较高，西南角较低
                const distToNE = Math.sqrt(Math.pow(lat - maxLat, 2) + Math.pow(lng - maxLng, 2));
                const distToSW = Math.sqrt(Math.pow(lat - minLat, 2) + Math.pow(lng - minLng, 2));

                // 添加随机波动
                const elevation = baseElevation +
                    (distToNE * 1000 - distToSW * 1000) * 0.15 +
                    (Math.random() - 0.5) * 0.2;

                data.push({
                    lat: lat,
                    lng: lng,
                    elevation: elevation
                });
            }
        }
    }

    return data;
}

// 判断点是否在地块内（简化版）
function isPointInField(lat, lng) {
    // 使用边界框简化判断
    const minLat = 39.328522;
    const maxLat = 39.331741;
    const minLng = 117.715330;
    const maxLng = 117.721639;

    return lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng;
}

// 根据高程获取颜色
function getElevationColor(elevation) {
    if (elevation > 0.5) return '#d73027';
    if (elevation > 0.3) return '#fc8d59';
    if (elevation > 0.1) return '#fee090';
    if (elevation > -0.1) return '#e0f3f8';
    if (elevation > -0.3) return '#91bfdb';
    return '#4575b4';
}

// 更新分析结果
function updateLevelingResults(data) {
    const elevations = data.map(p => p.elevation);
    const maxElevation = Math.max(...elevations);
    const minElevation = Math.min(...elevations);
    const avgElevation = elevations.reduce((a, b) => a + b, 0) / elevations.length;
    const maxDiff = maxElevation - minElevation;

    // 计算需要平整的面积（高差超过0.3米的区域）
    const needLevelingCount = elevations.filter(e => Math.abs(e) > 0.3).length;
    const needLevelingArea = (needLevelingCount / elevations.length) * 45.6;

    // 更新显示
    const resultItems = document.querySelectorAll('#leveling-page .result-item .value-large');
    if (resultItems.length >= 4) {
        resultItems[0].textContent = maxDiff.toFixed(2) + ' 米';
        resultItems[1].textContent = Math.abs(avgElevation).toFixed(2) + ' 米';
        resultItems[2].textContent = needLevelingArea.toFixed(1) + ' 亩';

        // 判断需要平整的区域
        const regions = [];
        if (maxElevation > 0.3) regions.push('东北角');
        if (minElevation < -0.3) regions.push('西南角');
        resultItems[3].textContent = regions.length > 0 ? regions.join('、') : '无需平整';
    }
}

// 生成平整方案
function generateLevelingPlan() {
    if (!levelingHeatLayer) {
        showNotification('请先生成高程图', 'warning');
        return;
    }

    showNotification('正在生成平整方案...', 'info');

    setTimeout(() => {
        const plan = `
📋 平整方案报告

地块：A区-01号地块
面积：45.6亩
最大高差：0.68米

🎯 平整建议：
1. 东北角区域（约6.5亩）
   - 当前高程：+0.45~+0.68米
   - 建议削高：0.50米
   - 土方量：约650立方米

2. 西南角区域（约5.8亩）
   - 当前高程：-0.35~-0.48米
   - 建议填低：0.40米
   - 土方量：约580立方米

💰 预估成本：
- 机械作业费：¥3,200
- 预计工期：2-3天
- 节水效益：提升15%

✅ 平整后效果：
- 最大高差：<0.15米
- 灌溉均匀度：>95%
- 产量提升：预计8-12%
        `;

        alert(plan);
        showNotification('平整方案生成完成！', 'success');
    }, 1000);
}

// 导出报告
function exportLevelingReport() {
    if (!levelingHeatLayer) {
        showNotification('请先生成高程图', 'warning');
        return;
    }

    showNotification('正在导出报告...', 'info');

    setTimeout(() => {
        alert('报告已导出！\n\n文件名：平整监测报告_A区01_' + new Date().toISOString().split('T')[0] + '.pdf\n\n报告包含：\n- 高程热力图\n- 数据分析表\n- 平整方案\n- 成本预算');
        showNotification('报告导出成功！', 'success');
    }, 1000);
}

// 开始平整监测
function startLeveling() {
    if (!levelingMap) {
        initLevelingMap();
        setTimeout(() => {
            showNotification('地图加载完成，请点击"生成高程图"开始分析', 'success');
        }, 500);
    } else {
        generateElevationMap();
    }
}

// ============================================
// 出苗分析功能
// ============================================

let seedlingMap = null;
let seedlingFieldPolygon = null;
let seedlingMarkers = [];
let missingSeedlingMarkers = [];
let showSeedlingMarkersFlag = true;

// 初始化出苗分析地图
function initSeedlingMap() {
    const container = document.getElementById('seedling-map');
    if (!container) {
        console.error('出苗分析地图容器不存在');
        return;
    }

    // 检查是否已经初始化
    if (seedlingMap) {
        console.log('出苗分析地图已初始化，跳过');
        return;
    }

    // 检查Leaflet是否加载
    if (typeof L === 'undefined') {
        console.error('Leaflet库未加载');
        container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f8f9fa; color: #e74c3c;"><i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-right: 10px;"></i><span>地图库加载失败，请检查网络连接</span></div>';
        return;
    }

    try {
        // 创建地图实例 - 棉花地块
        seedlingMap = L.map('seedling-map').setView([39.330131, 117.718475], 18);

        // 添加卫星地图图层
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles © Esri',
            maxZoom: 20
        }).addTo(seedlingMap);

        // 添加地块边界
        addSeedlingField();

        console.log('✅ 出苗分析地图初始化成功');

    } catch (error) {
        console.error('出苗分析地图初始化失败:', error);
        container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f8f9fa; color: #e74c3c;"><span>地图初始化失败: ' + error.message + '</span></div>';
    }
}

// 添加地块
function addSeedlingField() {
    const fieldCoords = [
        [39.331741, 117.715416],
        [39.328522, 117.715330],
        [39.328754, 117.721381],
        [39.331542, 117.721639]
    ];

    seedlingFieldPolygon = L.polygon(fieldCoords, {
        color: '#2ecc71',
        fillColor: 'rgba(46, 204, 113, 0.1)',
        weight: 3
    }).addTo(seedlingMap);

    seedlingFieldPolygon.bindPopup('<strong>B区-01号地块</strong><br>作物：棉花<br>面积：32.8亩');
}

// 开始识别出苗
function startSeedlingRecognition() {
    if (!seedlingMap) {
        showNotification('请先初始化地图', 'warning');
        return;
    }

    showNotification('正在使用AI识别出苗情况...', 'info');

    // 清除旧标记
    clearSeedlingMarkers();

    // 模拟AI识别过程
    setTimeout(() => {
        generateSeedlingData();
        updateSeedlingStatistics();
        showNotification('出苗识别完成！', 'success');
    }, 2000);
}

// 生成出苗数据
function generateSeedlingData() {
    const plantSpacing = parseFloat(document.getElementById('seedling-plant-spacing').value) || 30;
    const rowSpacing = parseFloat(document.getElementById('seedling-row-spacing').value) || 76;

    // 地块范围
    const minLat = 39.328522;
    const maxLat = 39.331741;
    const minLng = 117.715330;
    const maxLng = 117.721639;

    // 计算行列数（粗略估算）
    const latRange = maxLat - minLat;
    const lngRange = maxLng - minLng;

    // 1度纬度约111km，1度经度约85km（天津纬度）
    const fieldHeight = latRange * 111000; // 米
    const fieldWidth = lngRange * 85000; // 米

    const rows = Math.floor(fieldHeight / (rowSpacing / 100));
    const cols = Math.floor(fieldWidth / (plantSpacing / 100));

    // 限制最大标记数量，避免页面崩溃
    const maxMarkers = 2000;
    const totalPoints = rows * cols;

    // 如果点数太多，进行采样
    const samplingRate = totalPoints > maxMarkers ? maxMarkers / totalPoints : 1;

    console.log(`地块尺寸: ${fieldHeight.toFixed(1)}m × ${fieldWidth.toFixed(1)}m`);
    console.log(`理论行列: ${rows}行 × ${cols}列 = ${totalPoints}个点`);
    console.log(`采样率: ${(samplingRate * 100).toFixed(1)}%`);

    const latStep = latRange / rows;
    const lngStep = lngRange / cols;

    let actualCount = 0;
    let missingCount = 0;
    let displayedCount = 0;

    // 生成网格点
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // 采样控制
            if (Math.random() > samplingRate) {
                continue;
            }

            const lat = minLat + (i + 0.5) * latStep;
            const lng = minLng + (j + 0.5) * lngStep;

            // 90%的出苗率
            const hasPlant = Math.random() > 0.1;

            if (hasPlant) {
                // 正常出苗 - 绿色小点
                const marker = L.circleMarker([lat, lng], {
                    radius: 3,
                    color: '#2ecc71',
                    fillColor: '#2ecc71',
                    fillOpacity: 0.8,
                    weight: 1
                }).addTo(seedlingMap);

                marker.bindTooltip(`第${i + 1}行，第${j + 1}列<br>状态：正常`, {
                    permanent: false,
                    direction: 'top'
                });

                seedlingMarkers.push(marker);
                actualCount++;
                displayedCount++;
            } else {
                // 缺苗 - 红色标记
                const marker = L.circleMarker([lat, lng], {
                    radius: 4,
                    color: '#e74c3c',
                    fillColor: '#e74c3c',
                    fillOpacity: 0.9,
                    weight: 2
                }).addTo(seedlingMap);

                marker.bindTooltip(`第${i + 1}行，第${j + 1}列<br>状态：缺苗`, {
                    permanent: false,
                    direction: 'top'
                });

                missingSeedlingMarkers.push(marker);
                missingCount++;
                displayedCount++;
            }
        }
    }

    // 根据采样率估算实际总数
    const estimatedActualCount = Math.round(actualCount / samplingRate);
    const estimatedMissingCount = Math.round(missingCount / samplingRate);
    const estimatedTotal = estimatedActualCount + estimatedMissingCount;

    console.log(`显示标记: ${displayedCount}个`);
    console.log(`估算总数: ${estimatedTotal}株 (实际${estimatedActualCount} + 缺苗${estimatedMissingCount})`);

    // 保存统计数据
    window.seedlingStats = {
        actualCount: estimatedActualCount,
        theoreticalCount: totalPoints,
        missingCount: estimatedMissingCount,
        emergenceRate: (estimatedActualCount / totalPoints * 100).toFixed(1),
        avgSpacing: (plantSpacing * 1.04).toFixed(1) // 模拟实际株距略大
    };
}

// 更新统计数据
function updateSeedlingStatistics() {
    const stats = window.seedlingStats;
    if (!stats) return;

    const resultItems = document.querySelectorAll('#seedling-page .result-item .value-large');
    if (resultItems.length >= 5) {
        resultItems[0].textContent = stats.actualCount.toLocaleString() + ' 株';
        resultItems[1].textContent = stats.theoreticalCount.toLocaleString() + ' 株';
        resultItems[2].textContent = stats.emergenceRate + '%';
        resultItems[2].className = 'value-large ' + (stats.emergenceRate >= 90 ? 'success' : 'warning');
        resultItems[3].textContent = stats.missingCount.toLocaleString() + ' 株';
        resultItems[3].className = 'value-large ' + (stats.missingCount > 500 ? 'warning' : 'success');
        resultItems[4].textContent = stats.avgSpacing + ' cm';
    }

    // 更新补苗建议
    updateReplantingSuggestions();
}

// 更新补苗建议
function updateReplantingSuggestions() {
    const suggestions = [
        { icon: 'fa-map-marker-alt', text: '第3-5行，第10-15列区域缺苗较多，建议优先补苗' },
        { icon: 'fa-map-marker-alt', text: '第8行，第20-25列区域出苗稀疏，需要补苗' },
        { icon: 'fa-info-circle', text: '整体出苗率良好，建议在3天内完成补苗工作' }
    ];

    const suggestionList = document.querySelector('#seedling-page .suggestion-list');
    if (suggestionList) {
        suggestionList.innerHTML = suggestions.map(s => `
            <div class="suggestion-item">
                <i class="fas ${s.icon}"></i>
                <p>${s.text}</p>
            </div>
        `).join('');
    }
}

// 清除标记
function clearSeedlingMarkers() {
    seedlingMarkers.forEach(m => seedlingMap.removeLayer(m));
    missingSeedlingMarkers.forEach(m => seedlingMap.removeLayer(m));
    seedlingMarkers = [];
    missingSeedlingMarkers = [];
}

// 切换标记显示
function toggleSeedlingMarkers() {
    showSeedlingMarkersFlag = !showSeedlingMarkersFlag;

    seedlingMarkers.forEach(m => {
        if (showSeedlingMarkersFlag) {
            m.addTo(seedlingMap);
        } else {
            seedlingMap.removeLayer(m);
        }
    });

    missingSeedlingMarkers.forEach(m => {
        if (showSeedlingMarkersFlag) {
            m.addTo(seedlingMap);
        } else {
            seedlingMap.removeLayer(m);
        }
    });

    showNotification(showSeedlingMarkersFlag ? '标记已显示' : '标记已隐藏', 'info');
}

// 地图缩放控制
function seedlingZoomIn() {
    if (seedlingMap) {
        seedlingMap.zoomIn();
    }
}

function seedlingZoomOut() {
    if (seedlingMap) {
        seedlingMap.zoomOut();
    }
}

function seedlingResetView() {
    if (seedlingMap) {
        seedlingMap.setView([39.330131, 117.718475], 18);
        showNotification('视图已重置', 'info');
    }
}

// 生成补苗方案
function generateReplantingPlan() {
    const stats = window.seedlingStats;
    if (!stats) {
        showNotification('请先进行出苗识别', 'warning');
        return;
    }

    showNotification('正在生成补苗方案...', 'info');

    setTimeout(() => {
        const plan = `
📋 补苗方案报告

地块：B区-01号地块
作物：棉花
面积：32.8亩

📊 出苗统计：
- 理论株数：${stats.theoreticalCount.toLocaleString()} 株
- 实际出苗：${stats.actualCount.toLocaleString()} 株
- 出苗率：${stats.emergenceRate}%
- 缺苗数量：${stats.missingCount.toLocaleString()} 株

🎯 补苗建议：
1. 重点区域（约5.2亩）
   - 第3-5行，第10-15列
   - 缺苗约${Math.floor(stats.missingCount * 0.4)}株
   - 建议补苗时间：今明两天

2. 次要区域（约3.8亩）
   - 第8行，第20-25列
   - 缺苗约${Math.floor(stats.missingCount * 0.3)}株
   - 建议补苗时间：3天内

3. 零星缺苗（约2.1亩）
   - 其他区域零星缺苗
   - 缺苗约${Math.floor(stats.missingCount * 0.3)}株
   - 可随时补苗

💰 物资准备：
- 棉花种子：${Math.ceil(stats.missingCount * 1.2)}粒（含备用）
- 预计用工：2-3人天
- 预计成本：¥${Math.ceil(stats.missingCount * 0.5)}

✅ 预期效果：
- 补苗后出苗率：>98%
- 产量提升：预计5-8%
- 品质改善：均匀度提高
        `;

        alert(plan);
        showNotification('补苗方案生成完成！', 'success');
    }, 1000);
}

// 导出分析报告
function exportSeedlingReport() {
    const stats = window.seedlingStats;
    if (!stats) {
        showNotification('请先进行出苗识别', 'warning');
        return;
    }

    showNotification('正在导出报告...', 'info');

    setTimeout(() => {
        alert('报告已导出！\n\n文件名：出苗分析报告_B区01_' + new Date().toISOString().split('T')[0] + '.pdf\n\n报告包含：\n- 出苗分布图\n- 统计数据表\n- 缺苗位置标注\n- 补苗方案建议');
        showNotification('报告导出成功！', 'success');
    }, 1000);
}

// 开始出苗分析
function analyzeSeedling() {
    if (!seedlingMap) {
        initSeedlingMap();
        setTimeout(() => {
            showNotification('地图加载完成，请点击"开始识别"进行AI分析', 'success');
        }, 500);
    } else {
        startSeedlingRecognition();
    }
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

// 数据回溯功能
function viewTraceDetail(id) {
    alert(`查看作业详情 #${id}\n\n作业时间：2024-11-24 14:30\n作业类型：变量施肥\n地块：A区-01\n作业面积：45.6亩\n设备：T40-01\n操作员：张三\n用量：尿素 120kg\n\n作业轨迹、参数记录完整`);
}

// 添加质量规则
function addQualityRule() {
    alert('添加新的监管规则...\n请配置作业标准参数');
}

// 全局变量
let dashboardDevices = [
    { id: 1, name: 'T40-01', x: 250, y: 200, status: 'working', battery: 78, progress: 45, task: '变量施肥', field: 'A区-01', operator: '张三' },
    { id: 2, name: 'T40-02', x: 575, y: 240, status: 'working', battery: 92, progress: 28, task: '病虫害防治', field: 'B区-01', operator: '李四' },
    { id: 3, name: 'M300-01', x: 290, y: 425, status: 'standby', battery: 100, progress: 0, task: '待命', field: '基地', operator: '王五' }
];

let mapFields = [
    { name: 'A区-01', x: 100, y: 100, width: 300, height: 200, color: 'rgba(46, 204, 113, 0.3)' },
    { name: 'B区-01', x: 450, y: 150, width: 250, height: 180, color: 'rgba(52, 152, 219, 0.3)' },
    { name: 'C区果园', x: 150, y: 350, width: 280, height: 150, color: 'rgba(241, 196, 15, 0.3)' }
];

let animationFrame;
let pulseRadius = 0;

// 初始化页面
document.addEventListener('DOMContentLoaded', function () {
    // 默认显示控制台
    showPage('dashboard');

    // 初始化控制台地图
    initDashboardMap();

    // 绘制效率图表
    drawEfficiencyChart();

    // 添加导航点击事件
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const pageId = href.substring(1);
                showPage(pageId, this);
            }
        });
    });

    // 模拟实时数据更新
    setInterval(updateRealtimeData, 5000);
});

// 真实地图实例
let realMapInstance = null;
let realMapMarkers = [];

// 初始化控制台地图（真实地图版本）
function initDashboardMap() {
    const container = document.getElementById('realtime-map');
    if (!container) {
        console.error('地图容器不存在');
        return;
    }

    // 检查Leaflet是否加载
    if (typeof L === 'undefined') {
        console.error('Leaflet库未加载');
        container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f8f9fa; color: #e74c3c;"><i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-right: 10px;"></i><span>地图库加载失败，请检查网络连接</span></div>';
        return;
    }

    try {
        // 创建地图实例 - 天津市宁河区农田（真实农业区域）
        realMapInstance = L.map('realtime-map').setView([39.333202, 117.701554], 15);

        // 添加 OpenStreetMap 图层
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(realMapInstance);

        // 添加地块多边形
        addRealMapFields();

        // 添加设备标记
        addRealMapDevices();

        // 启动实时更新
        startRealMapUpdate();

        console.log('✅ 真实地图初始化成功');

    } catch (error) {
        console.error('地图初始化失败:', error);
        container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f8f9fa; color: #e74c3c;"><span>地图初始化失败: ' + error.message + '</span></div>';
    }
}

// 添加地块到真实地图
function addRealMapFields() {
    const fields = [
        {
            name: 'A区-01号地块',
            coords: [
                [39.331741, 117.715416],
                [39.328522, 117.715330],
                [39.328754, 117.721381],
                [39.331542, 117.721639]
            ],
            color: '#2ecc71',
            area: '45.6亩'
        },
        {
            name: 'B区-01号地块',
            coords: [
                [39.340571, 117.693551],
                [39.336754, 117.693400],
                [39.336604, 117.696962],
                [39.340488, 117.697070]
            ],
            color: '#3498db',
            area: '52.3亩'
        },
        {
            name: 'C区果园',
            coords: [
                [39.336770, 117.681921],
                [39.333152, 117.681684],
                [39.332953, 117.687092],
                [39.336621, 117.687328]
            ],
            color: '#f39c12',
            area: '28.5亩'
        }
    ];

    fields.forEach(field => {
        const polygon = L.polygon(field.coords, {
            color: field.color,
            fillColor: field.color,
            fillOpacity: 0.3,
            weight: 3
        }).addTo(realMapInstance);

        // 绑定悬停提示和点击弹窗
        polygon.bindPopup(`<strong>${field.name}</strong><br>面积：${field.area}`);
        polygon.bindTooltip(`${field.name} (${field.area})`, {
            permanent: false,
            direction: 'center',
            className: 'field-tooltip'
        });
    });
}

// 添加设备到真实地图
function addRealMapDevices() {
    // 定义设备在地块内的精确位置
    const devicePositions = {
        1: { lat: 39.330132, lng: 117.718484 }, // T40-01 在 A区地块内
        2: { lat: 39.338588, lng: 117.695235 }, // T40-02 在 B区地块内
        3: { lat: 39.334862, lng: 117.684506 }  // M300-01 在 C区果园内
    };

    dashboardDevices.forEach(device => {
        // 使用预定义的位置
        const position = devicePositions[device.id];
        const lat = position.lat;
        const lng = position.lng;

        const color = device.status === 'working' ? '#2ecc71' :
            device.status === 'standby' ? '#f39c12' : '#95a5a6';

        // 创建自定义图标
        const icon = L.divIcon({
            className: 'custom-device-marker',
            html: `
                <div style="position: relative;">
                    <div class="device-pulse" style="
                        position: absolute;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background: ${color};
                        opacity: 0.3;
                        animation: pulse 2s infinite;
                        top: -5px;
                        left: -5px;
                    "></div>
                    <div style="
                        width: 30px;
                        height: 30px;
                        background: ${color};
                        border: 3px solid white;
                        border-radius: 50%;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 14px;
                        position: relative;
                        z-index: 10;
                    ">✈</div>
                </div>
            `,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });

        const marker = L.marker([lat, lng], { icon: icon }).addTo(realMapInstance);

        // 绑定悬停提示（简洁版）
        marker.bindTooltip(`${device.name} - ${device.status === 'working' ? '作业中' : '待命'}`, {
            permanent: false,
            direction: 'top',
            offset: [0, -15],
            className: 'device-tooltip'
        });

        // 绑定点击弹出窗口（详细信息）
        marker.bindPopup(`
            <div style="min-width: 200px;">
                <h3 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 16px;">${device.name}</h3>
                <p style="margin: 5px 0; font-size: 13px;"><strong>状态：</strong>${device.status === 'working' ? '🟢 作业中' : '🟡 待命'}</p>
                <p style="margin: 5px 0; font-size: 13px;"><strong>任务：</strong>${device.task}</p>
                <p style="margin: 5px 0; font-size: 13px;"><strong>地块：</strong>${device.field}</p>
                <p style="margin: 5px 0; font-size: 13px;"><strong>操作员：</strong>${device.operator}</p>
                <p style="margin: 5px 0; font-size: 13px;"><strong>电量：</strong>${device.battery}%</p>
                ${device.progress > 0 ? `<p style="margin: 5px 0; font-size: 13px;"><strong>进度：</strong>${device.progress}%</p>` : ''}
            </div>
        `);

        realMapMarkers.push({ marker, device, lat, lng });
    });
}

// 实时更新设备位置
function startRealMapUpdate() {
    setInterval(() => {
        realMapMarkers.forEach(({ marker, device, lat, lng }) => {
            if (device.status === 'working') {
                // 模拟设备在地块内移动（更小的范围）
                const newLat = lat + (Math.random() - 0.5) * 0.00005;
                const newLng = lng + (Math.random() - 0.5) * 0.00005;

                marker.setLatLng([newLat, newLng]);

                // 更新数据
                if (device.progress < 100) {
                    device.progress = Math.min(100, device.progress + Math.floor(Math.random() * 3));
                }
                if (device.battery > 10) {
                    device.battery = Math.max(10, device.battery - Math.floor(Math.random() * 2));
                }

                // 更新弹出窗口内容
                marker.getPopup().setContent(`
                    <div style="min-width: 200px;">
                        <h3 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 16px;">${device.name}</h3>
                        <p style="margin: 5px 0; font-size: 13px;"><strong>状态：</strong>🟢 作业中</p>
                        <p style="margin: 5px 0; font-size: 13px;"><strong>任务：</strong>${device.task}</p>
                        <p style="margin: 5px 0; font-size: 13px;"><strong>地块：</strong>${device.field}</p>
                        <p style="margin: 5px 0; font-size: 13px;"><strong>操作员：</strong>${device.operator}</p>
                        <p style="margin: 5px 0; font-size: 13px;"><strong>电量：</strong>${device.battery}%</p>
                        <p style="margin: 5px 0; font-size: 13px;"><strong>进度：</strong>${device.progress}%</p>
                    </div>
                `);
            }
        });
    }, 3000);
}

// 动画绘制地图
function animateDashboardMap() {
    const canvas = document.getElementById('dashboardMapCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // 清空画布
    ctx.clearRect(0, 0, width, height);

    // 绘制背景
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#e8f5e9');
    gradient.addColorStop(1, '#c8e6c9');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 绘制网格
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    for (let y = 0; y < height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    // 绘制地块
    mapFields.forEach(field => {
        ctx.fillStyle = field.color;
        ctx.fillRect(field.x, field.y, field.width, field.height);

        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(field.x, field.y, field.width, field.height);

        // 绘制地块名称
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.font = 'bold 16px Microsoft YaHei';
        ctx.textAlign = 'center';
        ctx.fillText(field.name, field.x + field.width / 2, field.y + field.height / 2);
    });

    // 绘制设备
    pulseRadius += 0.5;
    if (pulseRadius > 30) pulseRadius = 0;

    dashboardDevices.forEach(device => {
        const color = device.status === 'working' ? '#2ecc71' :
            device.status === 'standby' ? '#f39c12' : '#95a5a6';

        // 绘制脉冲效果（仅作业中的设备）
        if (device.status === 'working') {
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.globalAlpha = 1 - (pulseRadius / 30);
            ctx.beginPath();
            ctx.arc(device.x, device.y, 15 + pulseRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
        }

        // 绘制设备图标
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(device.x, device.y, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.stroke();

        // 绘制设备图标（无人机）
        ctx.fillStyle = 'white';
        ctx.font = '12px FontAwesome';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('✈', device.x, device.y);

        // 绘制设备名称
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.font = 'bold 12px Microsoft YaHei';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(device.name, device.x, device.y + 18);

        // 绘制作业轨迹（作业中的设备）
        if (device.status === 'working') {
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.moveTo(device.x - 50, device.y);
            ctx.lineTo(device.x, device.y);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.globalAlpha = 1;
        }
    });

    // 继续动画
    animationFrame = requestAnimationFrame(animateDashboardMap);
}

// 显示设备信息面板
function showDeviceInfo(device) {
    const panel = document.getElementById('mapInfoPanel');
    const title = document.getElementById('infoPanelTitle');
    const content = document.getElementById('infoPanelContent');

    title.textContent = device.name;
    content.innerHTML = `
        <p><strong>状态：</strong>${device.status === 'working' ? '作业中' : device.status === 'standby' ? '待命' : '离线'}</p>
        <p><strong>任务：</strong>${device.task}</p>
        <p><strong>地块：</strong>${device.field}</p>
        <p><strong>操作员：</strong>${device.operator}</p>
        <p><strong>电量：</strong>${device.battery}%</p>
        ${device.progress > 0 ? `<p><strong>进度：</strong>${device.progress}%</p>` : ''}
    `;

    panel.style.display = 'block';
}

// 隐藏设备信息面板
function hideDeviceInfo() {
    const panel = document.getElementById('mapInfoPanel');
    panel.style.display = 'none';
}

// 显示设备详情
function showDeviceDetail(device) {
    alert(`设备详情\n\n设备名称：${device.name}\n状态：${device.status === 'working' ? '作业中' : device.status === 'standby' ? '待命' : '离线'}\n任务：${device.task}\n地块：${device.field}\n操作员：${device.operator}\n电量：${device.battery}%\n${device.progress > 0 ? '进度：' + device.progress + '%' : ''}`);
}

// 更新设备数据
function updateDashboardDevices() {
    dashboardDevices.forEach(device => {
        if (device.status === 'working') {
            // 更新进度
            if (device.progress < 100) {
                device.progress = Math.min(100, device.progress + Math.floor(Math.random() * 3));
            }

            // 更新电量
            if (device.battery > 10) {
                device.battery = Math.max(10, device.battery - Math.floor(Math.random() * 2));
            }

            // 模拟移动
            device.x += (Math.random() - 0.5) * 2;
            device.y += (Math.random() - 0.5) * 2;

            // 保持在地块范围内
            device.x = Math.max(50, Math.min(1150, device.x));
            device.y = Math.max(50, Math.min(450, device.y));
        }
    });
}

// 地图控制功能
function toggleMapLayer(layer) {
    if (!realMapInstance) return;

    document.querySelectorAll('.map-controls .control-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.control-btn').classList.add('active');

    // 移除当前图层
    realMapInstance.eachLayer(function (layer) {
        if (layer instanceof L.TileLayer) {
            realMapInstance.removeLayer(layer);
        }
    });

    // 添加新图层
    if (layer === 'satellite') {
        // 卫星图层（使用Esri卫星图）
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles © Esri'
        }).addTo(realMapInstance);
        showNotification('已切换到卫星图模式', 'success');
    } else if (layer === 'terrain') {
        // 地形图
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(realMapInstance);
        showNotification('已切换到地形图模式', 'success');
    } else {
        // 混合模式
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(realMapInstance);
        showNotification('已切换到混合模式', 'success');
    }
}

function refreshMap() {
    if (realMapInstance) {
        realMapInstance.setView([39.333202, 117.701554], 15);
        showNotification('地图已刷新', 'success');
    }
}

// 绘制效率图表
function drawEfficiencyChart() {
    const canvas = document.getElementById('efficiencyChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // 清空画布
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, width, height);

    // 数据
    const labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const data = [65, 72, 68, 85, 78, 92, 88];
    const maxValue = 100;

    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = chartWidth / data.length - 10;

    // 绘制坐标轴
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // 绘制柱状图
    data.forEach((value, index) => {
        const x = padding + index * (chartWidth / data.length) + 5;
        const barHeight = (value / maxValue) * chartHeight;
        const y = height - padding - barHeight;

        // 渐变色
        const gradient = ctx.createLinearGradient(x, y, x, height - padding);
        gradient.addColorStop(0, '#2ecc71');
        gradient.addColorStop(1, '#27ae60');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);

        // 绘制数值
        ctx.fillStyle = '#2c3e50';
        ctx.font = 'bold 12px Microsoft YaHei';
        ctx.textAlign = 'center';
        ctx.fillText(value + '%', x + barWidth / 2, y - 5);

        // 绘制标签
        ctx.fillStyle = '#7f8c8d';
        ctx.font = '11px Microsoft YaHei';
        ctx.fillText(labels[index], x + barWidth / 2, height - padding + 20);
    });

    // 绘制标题
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 14px Microsoft YaHei';
    ctx.textAlign = 'left';
    ctx.fillText('本周作业效率', padding, padding - 15);
}

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
document.addEventListener('click', function (e) {
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
document.addEventListener('keydown', function (e) {
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
window.addEventListener('load', function () {
    console.log('智慧农业管理平台加载完成');
    console.log('版本: 1.0.0');
    console.log('功能模块: 农田管理、智能巡田、变量作业、三维航线、数据监管');
});

// AI助手功能
let aiAssistantActive = false;
let voiceEnabled = true;

function toggleAI() {
    const assistant = document.getElementById('aiAssistant');
    aiAssistantActive = !aiAssistantActive;

    if (aiAssistantActive) {
        assistant.classList.add('active');
        speakText('AI助手已启动，有什么可以帮您？');
    } else {
        assistant.classList.remove('active');
    }
}

function handleAIEnter(event) {
    if (event.key === 'Enter') {
        sendAIMessage();
    }
}

function sendAIMessage() {
    const input = document.getElementById('aiInput');
    const message = input.value.trim();

    if (!message) return;

    // 添加用户消息
    addAIMessage(message, 'user');
    input.value = '';

    // 模拟AI回复
    setTimeout(() => {
        const response = generateAIResponse(message);
        addAIMessage(response, 'bot');
        speakText(response);
    }, 1000);
}

function addAIMessage(text, type) {
    const chat = document.getElementById('aiChat');
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${type}`;

    messageDiv.innerHTML = `
        <div class="ai-avatar">
            <i class="fas fa-${type === 'bot' ? 'robot' : 'user'}"></i>
        </div>
        <div class="ai-content">
            <p>${text}</p>
        </div>
    `;

    chat.appendChild(messageDiv);
    chat.scrollTop = chat.scrollHeight;
}

function generateAIResponse(message) {
    const msg = message.toLowerCase();

    if (msg.includes('统计') || msg.includes('数据')) {
        return `今日作业统计：\n- 完成作业：42次\n- 作业面积：856亩\n- 作业时长：12.5小时\n- 节省成本：¥2,850\n\n整体表现优秀！`;
    } else if (msg.includes('设备') || msg.includes('无人机')) {
        return `当前设备状态：\n- T40-01：作业中（电量78%）\n- T40-02：作业中（电量92%）\n- M300-01：待命（电量100%）\n\n所有设备运行正常。`;
    } else if (msg.includes('天气')) {
        return `当前天气：晴天 25°C\n风速：2.3 m/s\n湿度：65%\n\n天气条件适宜作业，建议继续进行田间作业。`;
    } else if (msg.includes('建议') || msg.includes('推荐')) {
        return `根据当前数据分析：\n1. A区地块长势良好，建议继续当前管理\n2. B区部分区域需要补充施肥\n3. C区果园建议进行病虫害预防\n\n需要生成详细方案吗？`;
    } else if (msg.includes('帮助') || msg.includes('功能')) {
        return `我可以帮您：\n- 查询作业数据和统计\n- 分析农田状况\n- 生成作业建议\n- 设备故障诊断\n- 天气预报查询\n- 生成各类报告\n\n请告诉我您需要什么帮助。`;
    } else {
        return `我理解您的问题了。根据系统数据分析，建议您查看相关功能模块获取更详细的信息。需要我为您导航到具体页面吗？`;
    }
}

function quickAsk(question) {
    document.getElementById('aiInput').value = question;
    sendAIMessage();
}

// 语音播报功能
function toggleVoice() {
    voiceEnabled = !voiceEnabled;
    const icon = document.getElementById('voiceIcon');
    const btn = document.querySelector('.voice-control');

    if (voiceEnabled) {
        icon.className = 'fas fa-volume-up';
        btn.classList.remove('muted');
        showNotification('语音播报已开启', 'success');
        speakText('语音播报已开启');
    } else {
        icon.className = 'fas fa-volume-mute';
        btn.classList.add('muted');
        showNotification('语音播报已关闭', 'info');
    }
}

function speakText(text) {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;

    // 取消之前的语音
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;

    window.speechSynthesis.speak(utterance);
}

// 快捷操作功能
function quickExport() {
    showNotification('正在导出数据...', 'info');

    setTimeout(() => {
        // 创建CSV数据
        const csvContent = generateCSVData();
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `智慧农业数据_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showNotification('数据导出成功！', 'success');
        speakText('数据已成功导出');
    }, 1000);
}

function generateCSVData() {
    return `日期,作业类型,地块,面积(亩),操作员,状态
2024-11-24,变量施肥,A区-01,45.6,张三,已完成
2024-11-23,病虫害防治,B区-01,52.3,李四,已完成
2024-11-22,航测巡田,A区-02,38.2,王五,已完成
2024-11-21,变量除草,A区-01,45.6,张三,已完成`;
}

function quickPrint() {
    showNotification('正在准备打印...', 'info');
    speakText('正在准备打印报告');

    setTimeout(() => {
        window.print();
    }, 500);
}

function quickShare() {
    if (navigator.share) {
        navigator.share({
            title: '智慧农业管理平台',
            text: '查看我的农田管理数据',
            url: window.location.href
        }).then(() => {
            showNotification('分享成功！', 'success');
        }).catch(() => {
            showShareDialog();
        });
    } else {
        showShareDialog();
    }
}

function showShareDialog() {
    const url = window.location.href;
    const dialog = `
        <div style="padding: 20px;">
            <h3>分享链接</h3>
            <input type="text" value="${url}" style="width: 100%; padding: 10px; margin: 10px 0;" readonly onclick="this.select()">
            <p style="color: #7f8c8d; font-size: 0.9rem;">点击输入框复制链接</p>
        </div>
    `;

    alert('分享功能\n\n链接：' + url + '\n\n请复制链接分享给他人');
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            showNotification('已进入全屏模式', 'success');
            event.target.innerHTML = '<i class="fas fa-compress"></i>';
        });
    } else {
        document.exitFullscreen().then(() => {
            showNotification('已退出全屏模式', 'info');
            event.target.innerHTML = '<i class="fas fa-expand"></i>';
        });
    }
}

// 智能提醒功能
function checkAlerts() {
    const alerts = [];

    // 检查设备电量
    dashboardDevices.forEach(device => {
        if (device.battery < 20 && device.status === 'working') {
            alerts.push({
                type: 'warning',
                message: `${device.name} 电量不足 ${device.battery}%，建议尽快更换电池`
            });
        }
    });

    // 检查天气
    const weather = getCurrentWeather();
    if (weather.windSpeed > 5) {
        alerts.push({
            type: 'warning',
            message: '当前风速较大，不适宜无人机作业'
        });
    }

    // 显示提醒
    alerts.forEach(alert => {
        showNotification(alert.message, alert.type);
        speakText(alert.message);
    });
}

function getCurrentWeather() {
    return {
        temp: 25,
        condition: '晴天',
        windSpeed: 2.3,
        humidity: 65
    };
}

// 数据实时同步
function syncDataToCloud() {
    showNotification('正在同步数据到云端...', 'info');

    setTimeout(() => {
        showNotification('数据同步成功！', 'success');
        speakText('数据已同步到云端');
    }, 2000);
}

// 自动保存功能
let autoSaveTimer;
function enableAutoSave() {
    autoSaveTimer = setInterval(() => {
        console.log('自动保存数据...');
        // 实际应用中这里应该保存表单数据
    }, 60000); // 每分钟自动保存
}

// 性能监控
function monitorPerformance() {
    if (performance.memory) {
        const memory = performance.memory;
        console.log('内存使用:', {
            used: (memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
            total: (memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
            limit: (memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB'
        });
    }
}

// 离线检测
window.addEventListener('online', () => {
    showNotification('网络已连接', 'success');
    speakText('网络已恢复连接');
    syncDataToCloud();
});

window.addEventListener('offline', () => {
    showNotification('网络已断开，数据将保存在本地', 'warning');
    speakText('网络连接已断开');
});

// 页面可见性检测
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('页面已隐藏');
        // 暂停动画以节省资源
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
    } else {
        console.log('页面已显示');
        // 恢复动画
        const currentPage = document.querySelector('.page.active');
        if (currentPage && currentPage.id === 'dashboard-page') {
            animateDashboardMap();
        }
    }
});

// 初始化高级功能
document.addEventListener('DOMContentLoaded', function () {
    // 启用自动保存
    enableAutoSave();

    // 定期检查提醒
    setInterval(checkAlerts, 300000); // 每5分钟检查一次

    // 性能监控
    setInterval(monitorPerformance, 60000); // 每分钟监控一次

    // 欢迎语音
    setTimeout(() => {
        speakText('欢迎使用智慧农业管理平台');
    }, 1000);
});

// 数据可视化增强
function createAdvancedChart(canvasId, type, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    switch (type) {
        case 'line':
            drawLineChart(ctx, canvas.width, canvas.height, data);
            break;
        case 'bar':
            drawBarChart(ctx, canvas.width, canvas.height, data);
            break;
        case 'pie':
            drawPieChart(ctx, canvas.width, canvas.height, data);
            break;
        case 'radar':
            drawRadarChart(ctx, canvas.width, canvas.height, data);
            break;
    }
}

function drawLineChart(ctx, width, height, data) {
    // 实现折线图
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#2ecc71';
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.forEach((point, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - (point / 100) * height;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();
}

function drawBarChart(ctx, width, height, data) {
    // 实现柱状图
    const barWidth = width / data.length - 10;

    data.forEach((value, index) => {
        const x = index * (width / data.length) + 5;
        const barHeight = (value / 100) * height;
        const y = height - barHeight;

        const gradient = ctx.createLinearGradient(x, y, x, height);
        gradient.addColorStop(0, '#2ecc71');
        gradient.addColorStop(1, '#27ae60');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
    });
}

function drawPieChart(ctx, width, height, data) {
    // 实现饼图
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 10;

    let currentAngle = -Math.PI / 2;
    const total = data.reduce((sum, item) => sum + item.value, 0);

    data.forEach(item => {
        const sliceAngle = (item.value / total) * Math.PI * 2;

        ctx.fillStyle = item.color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();

        currentAngle += sliceAngle;
    });
}

function drawRadarChart(ctx, width, height, data) {
    // 实现雷达图
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 30;
    const sides = data.length;

    // 绘制背景网格
    ctx.strokeStyle = '#e0e0e0';
    for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        for (let j = 0; j < sides; j++) {
            const angle = (j / sides) * Math.PI * 2 - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius * (i / 5);
            const y = centerY + Math.sin(angle) * radius * (i / 5);

            if (j === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.stroke();
    }

    // 绘制数据
    ctx.fillStyle = 'rgba(46, 204, 113, 0.3)';
    ctx.strokeStyle = '#2ecc71';
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.forEach((value, index) => {
        const angle = (index / sides) * Math.PI * 2 - Math.PI / 2;
        const distance = (value / 100) * radius;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

console.log('智慧农业管理平台 - 高级功能已加载');
console.log('功能列表：AI助手、语音播报、数据导出、实时同步、智能提醒');


// ============================================
// 农田规划地图功能
// ============================================

let farmlandPlanningMap = null;
let drawingLayer = null;
let currentPolygon = null;
let drawnFields = [];
let isDrawing = false;
let drawingMode = 'select'; // 'select', 'draw', 'measure'
let currentMapLayer = null;
let streetLayer = null;
let satelliteLayer = null;

// 初始化农田规划地图
function initFarmlandPlanningMap() {
    const container = document.getElementById('farmland-planning-map');
    if (!container) {
        console.error('农田规划地图容器不存在');
        return;
    }

    // 检查是否已经初始化
    if (farmlandPlanningMap) {
        return;
    }

    try {
        // 创建地图实例
        farmlandPlanningMap = L.map('farmland-planning-map').setView([39.333202, 117.701554], 15);

        // 创建街道地图图层
        streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        });

        // 创建卫星地图图层（使用 Esri 卫星图）
        satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles © Esri',
            maxZoom: 19
        });

        // 默认添加街道地图
        streetLayer.addTo(farmlandPlanningMap);
        currentMapLayer = 'street';

        // 创建绘图图层
        drawingLayer = L.featureGroup().addTo(farmlandPlanningMap);

        // 添加已有地块
        addExistingFields();

        // 绑定工具按钮事件
        bindPlanningTools();

        // 绑定地图图层切换按钮
        bindMapLayerButtons();

        console.log('✅ 农田规划地图初始化成功');

    } catch (error) {
        console.error('农田规划地图初始化失败:', error);
        container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f8f9fa; color: #e74c3c;"><span>地图初始化失败: ' + error.message + '</span></div>';
    }
}

// 添加已有地块
function addExistingFields() {
    const existingFields = [
        {
            name: 'A区-01号地块',
            coords: [
                [39.331741, 117.715416],
                [39.328522, 117.715330],
                [39.328754, 117.721381],
                [39.331542, 117.721639]
            ],
            color: '#2ecc71',
            crop: '水稻',
            area: '45.6亩',
            date: '2024-03-15'
        },
        {
            name: 'A区-02号地块',
            coords: [
                [39.340571, 117.693551],
                [39.336754, 117.693400],
                [39.336604, 117.696962],
                [39.340488, 117.697070]
            ],
            color: '#3498db',
            crop: '小麦',
            area: '38.2亩',
            date: '2024-03-10'
        }
    ];

    existingFields.forEach(field => {
        const polygon = L.polygon(field.coords, {
            color: field.color,
            fillColor: field.color,
            fillOpacity: 0.3,
            weight: 3
        }).addTo(drawingLayer);

        polygon.bindPopup(`
            <strong>${field.name}</strong><br>
            作物：${field.crop}<br>
            面积：${field.area}<br>
            创建：${field.date}
        `);

        polygon.bindTooltip(field.name, {
            permanent: false,
            direction: 'center'
        });

        // 添加点击编辑功能
        polygon.on('click', function () {
            selectField(field, polygon);
        });

        drawnFields.push({
            field: field,
            polygon: polygon
        });
    });
}

// 绑定工具按钮
function bindPlanningTools() {
    const toolButtons = document.querySelectorAll('#farmland-planning-page .tool-btn');

    toolButtons.forEach((btn, index) => {
        btn.addEventListener('click', function () {
            // 移除所有active状态
            toolButtons.forEach(b => b.classList.remove('active'));
            // 添加当前按钮的active状态
            this.classList.add('active');

            // 根据按钮索引设置模式
            switch (index) {
                case 0: // 选择
                    setDrawingMode('select');
                    break;
                case 1: // 绘制边界
                    setDrawingMode('draw');
                    break;
                case 2: // 自动检测
                    autoDetectField();
                    break;
                case 3: // 测量
                    setDrawingMode('measure');
                    break;
                case 4: // 标注
                    setDrawingMode('marker');
                    break;
            }
        });
    });
}

// 设置绘图模式
function setDrawingMode(mode) {
    drawingMode = mode;

    // 移除之前的绘图监听
    farmlandPlanningMap.off('click');

    if (mode === 'draw') {
        showNotification('点击地图开始绘制地块边界', 'info');
        startDrawing();
    } else if (mode === 'measure') {
        showNotification('点击地图开始测量距离', 'info');
        startMeasuring();
    } else if (mode === 'marker') {
        showNotification('点击地图添加标注', 'info');
        startMarking();
    } else {
        showNotification('选择模式已激活', 'success');
    }
}

// 开始绘制
let drawingPoints = [];
let tempMarkers = [];
let tempLines = [];

function startDrawing() {
    drawingPoints = [];
    tempMarkers = [];
    tempLines = [];

    farmlandPlanningMap.on('click', function (e) {
        const latlng = e.latlng;
        drawingPoints.push([latlng.lat, latlng.lng]);

        // 添加临时标记
        const marker = L.circleMarker(latlng, {
            radius: 5,
            color: '#e74c3c',
            fillColor: '#e74c3c',
            fillOpacity: 1
        }).addTo(farmlandPlanningMap);
        tempMarkers.push(marker);

        // 如果有多个点，绘制连线
        if (drawingPoints.length > 1) {
            const line = L.polyline([
                drawingPoints[drawingPoints.length - 2],
                drawingPoints[drawingPoints.length - 1]
            ], {
                color: '#e74c3c',
                weight: 2,
                dashArray: '5, 5'
            }).addTo(farmlandPlanningMap);
            tempLines.push(line);
        }

        // 显示提示
        if (drawingPoints.length === 1) {
            showNotification('继续点击添加顶点，双击完成绘制', 'info');
        }
    });

    // 双击完成绘制
    farmlandPlanningMap.on('dblclick', function (e) {
        L.DomEvent.stopPropagation(e);
        finishDrawing();
    });
}

// 完成绘制
function finishDrawing() {
    if (drawingPoints.length < 3) {
        showNotification('至少需要3个点才能形成地块', 'warning');
        return;
    }

    // 移除临时标记和线
    tempMarkers.forEach(m => farmlandPlanningMap.removeLayer(m));
    tempLines.forEach(l => farmlandPlanningMap.removeLayer(l));

    // 创建多边形
    const polygon = L.polygon(drawingPoints, {
        color: '#2ecc71',
        fillColor: '#2ecc71',
        fillOpacity: 0.3,
        weight: 3
    }).addTo(drawingLayer);

    // 计算面积
    const area = calculateArea(drawingPoints);

    // 计算区域中心
    const center = polygon.getBounds().getCenter();

    // ========== 输出地块信息到控制台 ==========
    console.log('========================================');
    console.log('🌾 地块绘制完成');
    console.log('========================================');
    console.log('📍 地块顶点坐标（共 ' + drawingPoints.length + ' 个点）：');
    drawingPoints.forEach((point, index) => {
        console.log(`  点 ${index + 1}: 纬度 ${point[0].toFixed(6)}°, 经度 ${point[1].toFixed(6)}°`);
    });
    console.log('');
    console.log('📌 区域中心坐标：');
    console.log(`  纬度: ${center.lat.toFixed(6)}°`);
    console.log(`  经度: ${center.lng.toFixed(6)}°`);
    console.log('');
    console.log('📊 地块信息：');
    console.log(`  面积: ${area.toFixed(2)} 亩`);
    console.log(`  周长: ${calculatePerimeter(drawingPoints).toFixed(1)} 米`);
    console.log('========================================');
    // ========================================

    // 更新表单
    updateFieldForm(polygon, area);

    // 重置绘图状态
    farmlandPlanningMap.off('click');
    farmlandPlanningMap.off('dblclick');
    drawingPoints = [];

    showNotification('地块绘制完成！面积：' + area.toFixed(2) + ' 亩', 'success');

    // 切换回选择模式
    document.querySelector('#farmland-planning-page .tool-btn').click();
}

// 计算面积（简化版，实际应使用更精确的算法）
function calculateArea(coords) {
    if (coords.length < 3) return 0;

    let area = 0;
    for (let i = 0; i < coords.length; i++) {
        const j = (i + 1) % coords.length;
        area += coords[i][1] * coords[j][0];
        area -= coords[j][1] * coords[i][0];
    }
    area = Math.abs(area / 2);

    // 转换为亩（1度约111km，粗略计算）
    const areaInSquareMeters = area * 111000 * 111000;
    const areaInMu = areaInSquareMeters / 666.67;

    return areaInMu;
}

// 更新表单
function updateFieldForm(polygon, area) {
    const center = polygon.getBounds().getCenter();

    // 更新面积
    document.querySelector('#farmland-planning-page .info-display .info-item:nth-child(1) .value').textContent = area.toFixed(2) + ' 亩';

    // 更新中心坐标
    document.querySelector('#farmland-planning-page .info-display .info-item:nth-child(3) .value').textContent =
        `N ${center.lat.toFixed(4)}° E ${center.lng.toFixed(4)}°`;

    // 计算周长
    const perimeter = calculatePerimeter(polygon.getLatLngs()[0]);
    document.querySelector('#farmland-planning-page .info-display .info-item:nth-child(2) .value').textContent =
        perimeter.toFixed(1) + ' 米';
}

// 计算周长
function calculatePerimeter(coords) {
    let perimeter = 0;
    for (let i = 0; i < coords.length; i++) {
        const j = (i + 1) % coords.length;
        const dist = farmlandPlanningMap.distance(coords[i], coords[j]);
        perimeter += dist;
    }
    return perimeter;
}

// 开始测量
let measurePoints = [];
let measureMarkers = [];
let measureLine = null;

function startMeasuring() {
    measurePoints = [];
    measureMarkers = [];

    farmlandPlanningMap.on('click', function (e) {
        const latlng = e.latlng;
        measurePoints.push(latlng);

        // 添加标记
        const marker = L.circleMarker(latlng, {
            radius: 5,
            color: '#3498db',
            fillColor: '#3498db',
            fillOpacity: 1
        }).addTo(farmlandPlanningMap);
        measureMarkers.push(marker);

        // 如果有两个点，显示距离
        if (measurePoints.length === 2) {
            const distance = farmlandPlanningMap.distance(measurePoints[0], measurePoints[1]);

            // 绘制线
            if (measureLine) {
                farmlandPlanningMap.removeLayer(measureLine);
            }
            measureLine = L.polyline(measurePoints, {
                color: '#3498db',
                weight: 2
            }).addTo(farmlandPlanningMap);

            // 显示距离
            const midpoint = L.latLng(
                (measurePoints[0].lat + measurePoints[1].lat) / 2,
                (measurePoints[0].lng + measurePoints[1].lng) / 2
            );

            L.popup()
                .setLatLng(midpoint)
                .setContent(`距离: ${distance.toFixed(2)} 米`)
                .openOn(farmlandPlanningMap);

            showNotification(`测量距离: ${distance.toFixed(2)} 米`, 'success');

            // 重置
            setTimeout(() => {
                measureMarkers.forEach(m => farmlandPlanningMap.removeLayer(m));
                if (measureLine) farmlandPlanningMap.removeLayer(measureLine);
                measurePoints = [];
                measureMarkers = [];
                measureLine = null;
            }, 3000);
        }
    });
}

// 开始标注
function startMarking() {
    farmlandPlanningMap.on('click', function (e) {
        const markerText = prompt('请输入标注文字:');
        if (markerText) {
            L.marker(e.latlng)
                .addTo(drawingLayer)
                .bindPopup(markerText)
                .openPopup();

            showNotification('标注已添加', 'success');
        }
    });
}

// 自动检测地块
function autoDetectField() {
    showNotification('AI自动检测功能开发中...', 'info');

    // 模拟自动检测
    setTimeout(() => {
        const detectedCoords = [
            [39.3290, 117.8185],
            [39.3290, 117.8220],
            [39.3275, 117.8220],
            [39.3275, 117.8185]
        ];

        const polygon = L.polygon(detectedCoords, {
            color: '#f39c12',
            fillColor: '#f39c12',
            fillOpacity: 0.3,
            weight: 3
        }).addTo(drawingLayer);

        const area = calculateArea(detectedCoords);
        updateFieldForm(polygon, area);

        showNotification('自动检测完成！检测到1个地块', 'success');
    }, 2000);
}

// 选择地块
function selectField(field, polygon) {
    // 更新表单显示选中的地块信息
    document.querySelector('#farmland-planning-page input[placeholder="输入地块名称"]').value = field.name;
    document.querySelector('#farmland-planning-page select.form-control').value = field.crop;

    showNotification(`已选择: ${field.name}`, 'info');
}

// 新建地块
function createNewField() {
    if (!farmlandPlanningMap) {
        initFarmlandPlanningMap();
        setTimeout(() => {
            showNotification('请使用绘制工具创建新地块', 'info');
        }, 500);
    } else {
        // 激活绘制模式
        document.querySelectorAll('#farmland-planning-page .tool-btn')[1].click();
    }
}


// 绑定地图图层切换按钮
function bindMapLayerButtons() {
    const streetBtn = document.getElementById('streetMapBtn');
    const satelliteBtn = document.getElementById('satelliteMapBtn');

    if (!streetBtn || !satelliteBtn) return;

    // 默认激活街道地图按钮
    streetBtn.classList.add('active');

    // 街道地图按钮
    streetBtn.addEventListener('click', function () {
        switchPlanningMapLayer('street');
    });

    // 卫星地图按钮
    satelliteBtn.addEventListener('click', function () {
        switchPlanningMapLayer('satellite');
    });
}

// 切换地图图层
function switchPlanningMapLayer(layerType) {
    if (!farmlandPlanningMap) return;

    const streetBtn = document.getElementById('streetMapBtn');
    const satelliteBtn = document.getElementById('satelliteMapBtn');

    // 移除当前图层
    if (currentMapLayer === 'street' && farmlandPlanningMap.hasLayer(streetLayer)) {
        farmlandPlanningMap.removeLayer(streetLayer);
    } else if (currentMapLayer === 'satellite' && farmlandPlanningMap.hasLayer(satelliteLayer)) {
        farmlandPlanningMap.removeLayer(satelliteLayer);
    }

    // 添加新图层
    if (layerType === 'street') {
        streetLayer.addTo(farmlandPlanningMap);
        currentMapLayer = 'street';
        streetBtn.classList.add('active');
        satelliteBtn.classList.remove('active');
        showNotification('已切换到街道地图', 'success');
    } else if (layerType === 'satellite') {
        satelliteLayer.addTo(farmlandPlanningMap);
        currentMapLayer = 'satellite';
        satelliteBtn.classList.add('active');
        streetBtn.classList.remove('active');
        showNotification('已切换到卫星地图 - 可以看到真实农田影像', 'success');
    }

    // 确保绘图图层在最上层
    if (drawingLayer) {
        drawingLayer.bringToFront();
    }
}


// ============================================
// 病虫害监测功能
// ============================================

let pestMap = null;
let pestSatelliteLayer = null;
let pestStreetLayer = null;
let pestCurrentLayer = 'satellite';
let pestMarkerGroup = null;
let pestHeatGroup = null;
let pestMarkersVisible = true;
let pestHeatVisible = false;

// 病虫害数据
const pestData = [
    { lat: 39.3312, lng: 117.7185, name: '稻飞虱', level: 'severe',  rate: 38, field: 'A区-01', area: '东北角' },
    { lat: 39.3298, lng: 117.7172, name: '纹枯病',  level: 'severe',  rate: 31, field: 'A区-01', area: '中部'   },
    { lat: 39.3305, lng: 117.7195, name: '稻飞虱', level: 'moderate', rate: 16, field: 'A区-01', area: '南侧'   },
    { lat: 39.3386, lng: 117.6952, name: '稻瘟病', level: 'moderate', rate: 18, field: 'B区-01', area: '西侧'   },
    { lat: 39.3375, lng: 117.6945, name: '二化螟', level: 'moderate', rate: 14, field: 'B区-01', area: '中部'   },
    { lat: 39.3365, lng: 117.6960, name: '纹枯病', level: 'mild',     rate: 9,  field: 'B区-01', area: '东侧'   },
    { lat: 39.3348, lng: 117.6845, name: '蚜虫',   level: 'mild',     rate: 8,  field: 'C区果园', area: '北区'  },
    { lat: 39.3335, lng: 117.6835, name: '红蜘蛛', level: 'mild',     rate: 6,  field: 'C区果园', area: '南区'  },
];

const pestLevelColor = { severe: '#e74c3c', moderate: '#f39c12', mild: '#3498db', healthy: '#2ecc71' };
const pestLevelLabel = { severe: '重度', moderate: '中度', mild: '轻度', healthy: '健康' };

// 初始化病虫害监测地图
function initPestMonitorMap() {
    const container = document.getElementById('pest-monitor-map');
    if (!container || pestMap) return;

    if (typeof L === 'undefined') {
        container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#e74c3c;">地图库加载失败，请检查网络连接</div>';
        return;
    }

    try {
        pestMap = L.map('pest-monitor-map').setView([39.3340, 117.7050], 14);

        // 卫星图层
        pestSatelliteLayer = L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            { attribution: 'Tiles © Esri', maxZoom: 19 }
        ).addTo(pestMap);

        // 街道图层（备用）
        pestStreetLayer = L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            { attribution: '© OpenStreetMap contributors', maxZoom: 19 }
        );

        // 添加地块边界
        addPestMapFields();

        // 添加病虫害标记
        pestMarkerGroup = L.layerGroup().addTo(pestMap);
        pestHeatGroup  = L.layerGroup();
        addPestMarkers();

        console.log('✅ 病虫害监测地图初始化成功');
    } catch (e) {
        console.error('病虫害地图初始化失败:', e);
    }
}

// 添加地块边界
function addPestMapFields() {
    const fields = [
        {
            name: 'A区-01号地块（水稻）', area: '45.6亩', color: '#2ecc71',
            coords: [[39.331741,117.715416],[39.328522,117.715330],[39.328754,117.721381],[39.331542,117.721639]]
        },
        {
            name: 'B区-01号地块（水稻）', area: '52.3亩', color: '#3498db',
            coords: [[39.340571,117.693551],[39.336754,117.693400],[39.336604,117.696962],[39.340488,117.697070]]
        },
        {
            name: 'C区果园', area: '28.5亩', color: '#f39c12',
            coords: [[39.336770,117.681921],[39.333152,117.681684],[39.332953,117.687092],[39.336621,117.687328]]
        }
    ];

    fields.forEach(f => {
        L.polygon(f.coords, { color: f.color, fillColor: f.color, fillOpacity: 0.15, weight: 2 })
            .addTo(pestMap)
            .bindPopup(`<strong>${f.name}</strong><br>面积：${f.area}`);
    });
}

// 添加病虫害标记
function addPestMarkers() {
    pestMarkerGroup.clearLayers();

    pestData.forEach(p => {
        const color = pestLevelColor[p.level];

        // 外圈脉冲圆
        const pulse = L.circleMarker([p.lat, p.lng], {
            radius: p.level === 'severe' ? 22 : p.level === 'moderate' ? 17 : 13,
            color: color, fillColor: color, fillOpacity: 0.15, weight: 1.5
        }).addTo(pestMarkerGroup);

        // 内圈实心点
        const dot = L.circleMarker([p.lat, p.lng], {
            radius: p.level === 'severe' ? 9 : p.level === 'moderate' ? 7 : 5,
            color: '#fff', fillColor: color, fillOpacity: 0.95, weight: 2
        }).addTo(pestMarkerGroup);

        const popupHtml = `
            <div style="min-width:180px;">
                <div style="background:${color};color:#fff;padding:6px 10px;border-radius:4px 4px 0 0;font-weight:bold;">
                    <i class="fas fa-bug"></i> ${p.name} — ${pestLevelLabel[p.level]}
                </div>
                <div style="padding:8px 10px;font-size:0.88rem;line-height:1.7;">
                    <div>📍 ${p.field} · ${p.area}</div>
                    <div>📊 发病率：<strong style="color:${color}">${p.rate}%</strong></div>
                </div>
            </div>`;
        dot.bindPopup(popupHtml, { maxWidth: 220 });
        pulse.bindPopup(popupHtml, { maxWidth: 220 });
    });
}

// 添加热力图（用矩形色块模拟）
function addPestHeatmap() {
    pestHeatGroup.clearLayers();
    pestData.forEach(p => {
        const color = pestLevelColor[p.level];
        const size = p.level === 'severe' ? 0.0018 : p.level === 'moderate' ? 0.0013 : 0.0009;
        L.rectangle(
            [[p.lat - size, p.lng - size * 1.5], [p.lat + size, p.lng + size * 1.5]],
            { color: color, fillColor: color, fillOpacity: 0.35, weight: 0 }
        ).addTo(pestHeatGroup);
    });
}

// 切换地图图层
function switchPestMapLayer(type) {
    if (!pestMap) return;
    if (type === 'satellite') {
        if (!pestMap.hasLayer(pestSatelliteLayer)) pestSatelliteLayer.addTo(pestMap);
        if (pestMap.hasLayer(pestStreetLayer)) pestMap.removeLayer(pestStreetLayer);
        document.getElementById('pestLayerSatellite').classList.add('active');
        document.getElementById('pestLayerStreet').classList.remove('active');
    } else {
        if (!pestMap.hasLayer(pestStreetLayer)) pestStreetLayer.addTo(pestMap);
        if (pestMap.hasLayer(pestSatelliteLayer)) pestMap.removeLayer(pestSatelliteLayer);
        document.getElementById('pestLayerStreet').classList.add('active');
        document.getElementById('pestLayerSatellite').classList.remove('active');
    }
    pestCurrentLayer = type;
}

// 切换热力图
function togglePestHeatmap() {
    if (!pestMap) return;
    pestHeatVisible = !pestHeatVisible;
    const btn = document.getElementById('pestHeatmapBtn');
    if (pestHeatVisible) {
        addPestHeatmap();
        pestHeatGroup.addTo(pestMap);
        btn.classList.add('active');
        showNotification('热力图已开启', 'info');
    } else {
        pestMap.removeLayer(pestHeatGroup);
        btn.classList.remove('active');
        showNotification('热力图已关闭', 'info');
    }
}

// 切换标记点
function togglePestMarkers() {
    if (!pestMap) return;
    pestMarkersVisible = !pestMarkersVisible;
    const btn = document.getElementById('pestMarkersBtn');
    if (pestMarkersVisible) {
        pestMarkerGroup.addTo(pestMap);
        btn.classList.add('active');
    } else {
        pestMap.removeLayer(pestMarkerGroup);
        btn.classList.remove('active');
    }
}

// 定位到某个病虫害点
function locatePest(lat, lng) {
    if (!pestMap) return;
    pestMap.setView([lat, lng], 17, { animate: true });
    showNotification('已定位到病虫害位置', 'info');
}

// 开始扫描
function startPestScan() {
    if (!pestMap) {
        initPestMonitorMap();
        setTimeout(() => showNotification('地图加载完成，正在执行AI扫描...', 'info'), 600);
        setTimeout(() => showNotification('扫描完成！共发现 22 处病虫害预警', 'success'), 2200);
        return;
    }
    showNotification('正在执行AI病虫害扫描...', 'info');
    setTimeout(() => {
        addPestMarkers();
        showNotification('扫描完成！共发现 22 处病虫害预警', 'success');
    }, 1800);
}

// 查看详情
function viewPestDetail(name, field) {
    const info = {
        '稻飞虱':    { drug: '吡蚜酮 25% WP，20g/亩', timing: '傍晚施药，避免高温', note: '重点喷施叶背面' },
        '纹枯病':    { drug: '井冈霉素 5% AS，100mL/亩', timing: '3天内完成', note: '重点喷施茎基部' },
        '稻瘟病':    { drug: '三环唑 75% WP，30g/亩', timing: '连阴雨后及时施药', note: '叶瘟、穗颈瘟均需防治' },
        '二化螟':    { drug: '氯虫苯甲酰胺 20% SC，10mL/亩', timing: '卵孵高峰期施药', note: '注意安全间隔期' },
        '蚜虫':      { drug: '啶虫脒 20% SP，10g/亩', timing: '发生初期施药', note: '注意保护天敌' },
        '红蜘蛛':    { drug: '阿维菌素 1.8% EC，30mL/亩', timing: '点片发生时施药', note: '叶背面均匀喷雾' },
        '小麦条锈病':{ drug: '戊唑醇 25% WP，30g/亩', timing: '发病初期施药', note: '连续阴雨天气注意预防' },
    };
    const d = info[name] || { drug: '请咨询农技专家', timing: '尽快处理', note: '—' };
    alert(`📋 病虫害详情\n\n病害名称：${name}\n发生地块：${field}\n\n💊 推荐药剂：${d.drug}\n⏰ 施药时机：${d.timing}\n⚠️ 注意事项：${d.note}`);
}

// 生成完整防治方案
function generatePestPlan() {
    showNotification('正在生成防治方案...', 'info');
    setTimeout(() => {
        alert(`📋 病虫害综合防治方案\n\n监测日期：2025-04-27\n监测地块：全部（128块）\n\n🔴 紧急处理（今日）：\n  · A区-01 稻飞虱（38%）→ 吡蚜酮 25% WP\n  · A区-01 纹枯病（31%）→ 井冈霉素 5% AS\n\n🟡 3天内处理：\n  · B区-01 稻瘟病（18%）→ 三环唑 75% WP\n  · B区-01 二化螟（14%）→ 氯虫苯甲酰胺\n\n🔵 持续观察：\n  · C区果园 蚜虫（8%）→ 啶虫脒 20% SP\n  · C区果园 红蜘蛛（6%）→ 阿维菌素\n\n💰 预估防治成本：¥4,280\n📅 建议作业时间：今日 18:00 开始`);
        showNotification('防治方案已生成', 'success');
    }, 1200);
}

// 导出报告
function exportPestReport() {
    showNotification('正在生成报告...', 'info');
    setTimeout(() => {
        alert('报告已导出！\n\n文件名：病虫害监测报告_' + new Date().toISOString().split('T')[0] + '.pdf\n\n报告包含：\n- 病虫害分布地图\n- 各地块发病率统计\n- AI防治建议\n- 用药成本预算');
        showNotification('报告导出成功！', 'success');
    }, 1000);
}

// ============================================
// 设备连接管理
// ============================================

// 设备数据库
const deviceDatabase = {
    'dji-t40-01': {
        name: '道通 EVO Max 4T', model: '农业植保无人机 · 40L载药量', brand: 'dji', status: 'connected',
        sn: 'AUTEL-EVO-A001', icon: 'fa-helicopter',
        telemetry: { lat: '39.3301°N', lng: '117.7185°E', alt: '8.5 m', speed: '6.2 m/s', battery: '87%', liquid: '32.5 L', signal: '强 (-62dBm)', flightStatus: '作业中', area: '12.3 亩', time: '00:18:42' },
        config: { '最大载药量': '40 L', '喷幅': '9 m', '作业速度': '7 m/s', '飞行高度': '1.5~3 m', '定位方式': 'RTK+GPS', '图传距离': '7 km', '防护等级': 'IP67', '电池容量': '30000 mAh' },
        connMethods: [{ type: 'Autel SDK', icon: 'fa-mobile-alt', desc: '通过道通遥控器 USB 连接', active: true }, { type: '4G 图传', icon: 'fa-signal', desc: '道通农业 4G 图传模块', active: false }],
        history: [
            { date: '2025-04-27', field: 'A区-01', type: '变量施肥', area: '45.6亩', status: 'completed' },
            { date: '2025-04-26', field: 'B区-01', type: '病虫害防治', area: '32.8亩', status: 'completed' },
            { date: '2025-04-25', field: 'A区-02', type: '变量施肥', area: '38.2亩', status: 'completed' }
        ]
    },
    'dji-t10-02': {
        name: '道通 Dragonfish Pro', model: '农业植保无人机 · 10L载药量', brand: 'dji', status: 'connected',
        sn: 'AUTEL-DF-B002', icon: 'fa-helicopter',
        telemetry: { lat: '39.3285°N', lng: '117.7213°E', alt: '2.0 m', speed: '4.5 m/s', battery: '52%', liquid: '6.8 L', signal: '中 (-75dBm)', flightStatus: '作业中', area: '8.7 亩', time: '00:12:05' },
        config: { '最大载药量': '10 L', '喷幅': '5 m', '作业速度': '6 m/s', '飞行高度': '1.5~3 m', '定位方式': 'GPS', '图传距离': '5 km', '防护等级': 'IP67', '电池容量': '12000 mAh' },
        connMethods: [{ type: 'Autel SDK', icon: 'fa-mobile-alt', desc: '通过道通遥控器 USB 连接', active: true }],
        history: [
            { date: '2025-04-27', field: 'B区-01', type: '除草作业', area: '28.3亩', status: 'completed' },
            { date: '2025-04-24', field: 'C区果园', type: '病虫害防治', area: '15.6亩', status: 'completed' }
        ]
    },
    'xag-p100-01': {
        name: '极飞 P100 Pro', model: '农业无人机 · 多光谱版', brand: 'xag', status: 'connected',
        sn: 'XAG-P100-C003', icon: 'fa-helicopter',
        telemetry: { lat: '39.3315°N', lng: '117.7162°E', alt: '50.0 m', speed: '12.0 m/s', battery: '96%', liquid: '-- L', signal: '强 (-58dBm)', flightStatus: '航测中', area: '22.1 亩', time: '00:08:30' },
        config: { '最大载重': '10 kg', '多光谱镜头': '5波段', '作业速度': '15 m/s', '飞行高度': '30~120 m', '定位方式': 'RTK', '图传距离': '5 km', '防护等级': 'IP54', '电池容量': '28000 mAh' },
        connMethods: [{ type: 'XAG API', icon: 'fa-cloud', desc: '极飞云平台 API 接入', active: true }, { type: '4G/5G', icon: 'fa-signal', desc: '极飞 4G 图传模块', active: true }],
        history: [
            { date: '2025-04-27', field: 'C区果园', type: '多光谱航测', area: '28.5亩', status: 'completed' },
            { date: '2025-04-26', field: 'A区-01', type: '长势监测', area: '45.6亩', status: 'completed' }
        ]
    },
    'dji-m300-01': {
        name: '道通 EVO II Pro', model: '测绘无人机 · 双云台', brand: 'dji', status: 'standby',
        sn: 'AUTEL-EVO2-D004', icon: 'fa-drone',
        telemetry: { lat: '39.3301°N', lng: '117.7185°E', alt: '0 m', speed: '0 m/s', battery: '100%', liquid: '-- L', signal: '强 (-60dBm)', flightStatus: '待机', area: '0 亩', time: '00:00:00' },
        config: { '最大载重': '2.7 kg', '云台接口': '双下置', '最大速度': '23 m/s', '最大飞行时间': '55 min', '定位方式': 'RTK+GPS', '图传距离': '15 km', '防护等级': 'IP45', '电池容量': '5935 mAh×2' },
        connMethods: [{ type: 'Autel SDK (MSDK)', icon: 'fa-laptop', desc: '通过道通 MSDK 接入', active: true }, { type: '4G 图传', icon: 'fa-signal', desc: '道通 4G 图传模块', active: false }],
        history: [
            { date: '2025-04-25', field: 'A区全域', type: '正射影像采集', area: '128亩', status: 'completed' },
            { date: '2025-04-20', field: 'C区果园', type: '三维建模', area: '28.5亩', status: 'completed' }
        ]
    },
    'huace-ag600-01': {
        name: '华测 AG-600', model: '农业植保无人机 · 60L载药量', brand: 'huace', status: 'standby',
        sn: 'HC-AG600-E005', icon: 'fa-helicopter',
        telemetry: { lat: '39.3301°N', lng: '117.7185°E', alt: '0 m', speed: '0 m/s', battery: '78%', liquid: '60.0 L', signal: '中 (-72dBm)', flightStatus: '待机', area: '0 亩', time: '00:00:00' },
        config: { '最大载药量': '60 L', '喷幅': '12 m', '作业速度': '8 m/s', '飞行高度': '1.5~5 m', '定位方式': 'RTK+北斗', '图传距离': '5 km', '防护等级': 'IP67', '电池容量': '40000 mAh' },
        connMethods: [{ type: 'MAVLink', icon: 'fa-code', desc: 'MAVLink v2 协议 UDP 连接', active: true }, { type: '4G', icon: 'fa-signal', desc: '华测 4G 数传模块', active: true }],
        history: [
            { date: '2025-04-24', field: 'A区-01', type: '大面积施肥', area: '45.6亩', status: 'completed' }
        ]
    },
    'autel-evo-01': {
        name: '道通 EVO Max 4T', model: '多功能无人机 · 热成像版', brand: 'autel', status: 'offline',
        sn: 'AT-EVO-F006', icon: 'fa-drone',
        telemetry: { lat: '--', lng: '--', alt: '-- m', speed: '-- m/s', battery: '--%', liquid: '-- L', signal: '无信号', flightStatus: '离线', area: '-- 亩', time: '--' },
        config: { '最大载重': '1.35 kg', '热成像分辨率': '640×512', '最大速度': '20 m/s', '最大飞行时间': '42 min', '定位方式': 'GPS+GLONASS', '图传距离': '20 km', '防护等级': 'IP43', '电池容量': '7100 mAh' },
        connMethods: [{ type: 'Autel SDK', icon: 'fa-mobile-alt', desc: '通过 Autel SDK 接入', active: false }, { type: '4G', icon: 'fa-signal', desc: '道通 4G 图传', active: false }],
        history: [
            { date: '2025-04-22', field: 'B区-01', type: '热成像巡检', area: '32.8亩', status: 'completed' }
        ]
    },
    'xag-v50-01': {
        name: '极飞 V50', model: '农业植保无人机 · 50L载药量', brand: 'xag', status: 'error',
        sn: 'XAG-V50-G007', icon: 'fa-helicopter',
        telemetry: { lat: '39.3298°N', lng: '117.7190°E', alt: '0 m', speed: '0 m/s', battery: '12%', liquid: '48.0 L', signal: '弱 (-88dBm)', flightStatus: '故障停机', area: '3.2 亩', time: '00:04:15' },
        config: { '最大载药量': '50 L', '喷幅': '10 m', '作业速度': '7 m/s', '飞行高度': '1.5~3 m', '定位方式': 'RTK', '图传距离': '5 km', '防护等级': 'IP67', '电池容量': '36000 mAh' },
        connMethods: [{ type: 'XAG API', icon: 'fa-cloud', desc: '极飞云平台 API 接入', active: true }],
        history: [
            { date: '2025-04-27', field: 'A区-02', type: '变量施肥（中断）', area: '3.2亩', status: 'warning' }
        ]
    }
};

let currentDeviceId = null;
let telemetryTimer = null;
let currentFilter = 'all';
let currentBrand = 'all';

// 选中设备，显示详情
function selectDevice(deviceId) {
    currentDeviceId = deviceId;
    const device = deviceDatabase[deviceId];
    if (!device) return;

    // 高亮选中卡片
    document.querySelectorAll('.dc-device-card').forEach(c => c.classList.remove('selected'));
    const card = document.querySelector(`[data-id="${deviceId}"]`);
    if (card) card.classList.add('selected');

    // 显示详情面板
    document.getElementById('dcDetailPlaceholder').style.display = 'none';
    document.getElementById('dcDetailContent').style.display = 'block';

    // 填充基本信息
    document.getElementById('dcDetailName').textContent = device.name;
    document.getElementById('dcDetailModel').textContent = device.model;
    document.getElementById('dcDetailIcon').innerHTML = `<i class="fas ${device.icon}"></i>`;

    const statusBadge = document.getElementById('dcDetailStatusBadge');
    const statusMap = { connected: '已连接', standby: '待机中', offline: '离线', error: '故障' };
    statusBadge.textContent = statusMap[device.status] || device.status;
    statusBadge.className = `dc-device-status-badge ${device.status}`;

    const connectBtn = document.getElementById('dcConnectBtn');
    if (device.status === 'connected' || device.status === 'standby') {
        connectBtn.innerHTML = '<i class="fas fa-unlink"></i> 断开连接';
        connectBtn.className = 'btn-danger btn-small';
    } else {
        connectBtn.innerHTML = '<i class="fas fa-plug"></i> 连接设备';
        connectBtn.className = 'btn-primary btn-small';
    }

    // 填充遥测数据
    const t = device.telemetry;
    document.getElementById('dcTeleLat').textContent = t.lat;
    document.getElementById('dcTeleLng').textContent = t.lng;
    document.getElementById('dcTeleAlt').textContent = t.alt;
    document.getElementById('dcTeleSpeed').textContent = t.speed;
    document.getElementById('dcTeleBattery').textContent = t.battery;
    document.getElementById('dcTeleLiquid').textContent = t.liquid;
    document.getElementById('dcTeleSignal').textContent = t.signal;
    document.getElementById('dcTeleFlightStatus').textContent = t.flightStatus;
    document.getElementById('dcTeleArea').textContent = t.area;
    document.getElementById('dcTeleTime').textContent = t.time;

    // 填充配置信息
    const configGrid = document.getElementById('dcConfigGrid');
    configGrid.innerHTML = Object.entries(device.config).map(([k, v]) => `
        <div class="dc-config-item">
            <span class="dc-config-label">${k}</span>
            <span class="dc-config-value">${v}</span>
        </div>
    `).join('');

    // 填充连接方式
    const connMethods = document.getElementById('dcConnMethods');
    connMethods.innerHTML = device.connMethods.map(m => `
        <div class="dc-conn-method ${m.active ? 'active' : ''}">
            <i class="fas ${m.icon}"></i>
            <div>
                <strong>${m.type}</strong>
                <p>${m.desc}</p>
            </div>
            <span class="dc-conn-status">${m.active ? '已启用' : '未启用'}</span>
        </div>
    `).join('');

    // 填充历史记录
    const historyBody = document.getElementById('dcHistoryBody');
    const statusLabels = { completed: '<span class="status completed">已完成</span>', warning: '<span class="status warning">中断</span>' };
    historyBody.innerHTML = device.history.map(h => `
        <tr>
            <td>${h.date}</td>
            <td>${h.field}</td>
            <td>${h.type}</td>
            <td>${h.area}</td>
            <td>${statusLabels[h.status] || h.status}</td>
        </tr>
    `).join('');

    // 如果是已连接设备，启动实时数据模拟
    if (telemetryTimer) clearInterval(telemetryTimer);
    if (device.status === 'connected') {
        startTelemetrySimulation(device);
    }
}

// 模拟实时遥测数据更新
function startTelemetrySimulation(device) {
    let seconds = parseTimeToSeconds(device.telemetry.time);
    let area = parseFloat(device.telemetry.area) || 0;
    let battery = parseInt(device.telemetry.battery) || 80;

    telemetryTimer = setInterval(() => {
        if (currentDeviceId !== device.sn.replace(/[^a-z0-9-]/gi, '').toLowerCase() &&
            !document.getElementById('dcDetailContent').style.display !== 'none') {
            // 仍然更新
        }
        seconds++;
        area += 0.002;
        if (battery > 5) battery -= 0.01;

        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');

        const altEl = document.getElementById('dcTeleAlt');
        const speedEl = document.getElementById('dcTeleSpeed');
        const areaEl = document.getElementById('dcTeleArea');
        const timeEl = document.getElementById('dcTeleTime');
        const battEl = document.getElementById('dcTeleBattery');

        if (altEl) altEl.textContent = (parseFloat(device.telemetry.alt) + (Math.random() - 0.5) * 0.3).toFixed(1) + ' m';
        if (speedEl) speedEl.textContent = (parseFloat(device.telemetry.speed) + (Math.random() - 0.5) * 0.5).toFixed(1) + ' m/s';
        if (areaEl) areaEl.textContent = area.toFixed(2) + ' 亩';
        if (timeEl) timeEl.textContent = `${h}:${m}:${s}`;
        if (battEl) battEl.textContent = battery.toFixed(0) + '%';
    }, 1000);
}

function parseTimeToSeconds(timeStr) {
    if (!timeStr || timeStr === '--') return 0;
    const parts = timeStr.split(':').map(Number);
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
}

// 切换连接状态
function toggleDeviceConnection() {
    if (!currentDeviceId) return;
    const device = deviceDatabase[currentDeviceId];
    if (!device) return;

    if (device.status === 'connected' || device.status === 'standby') {
        device.status = 'offline';
        showNotification(`已断开 ${device.name} 的连接`, 'warning');
        if (telemetryTimer) { clearInterval(telemetryTimer); telemetryTimer = null; }
    } else if (device.status === 'offline') {
        showNotification(`正在连接 ${device.name}...`, 'info');
        setTimeout(() => {
            device.status = 'standby';
            showNotification(`${device.name} 连接成功！`, 'success');
            selectDevice(currentDeviceId);
            updateDeviceCard(currentDeviceId);
            updateStatusCounts();
        }, 1500);
        return;
    } else if (device.status === 'error') {
        showNotification(`设备故障，请先排查后再连接`, 'warning');
        return;
    }

    selectDevice(currentDeviceId);
    updateDeviceCard(currentDeviceId);
    updateStatusCounts();
}

// 更新设备卡片状态
function updateDeviceCard(deviceId) {
    const device = deviceDatabase[deviceId];
    const card = document.querySelector(`[data-id="${deviceId}"]`);
    if (!card || !device) return;

    card.className = `dc-device-card ${device.status}`;
    card.dataset.status = device.status;

    const badge = card.querySelector('.dc-device-status-badge');
    const statusMap = { connected: '已连接', standby: '待机中', offline: '离线', error: '故障' };
    if (badge) {
        badge.textContent = statusMap[device.status];
        badge.className = `dc-device-status-badge ${device.status}`;
    }
}

// 更新状态计数
function updateStatusCounts() {
    const counts = { connected: 0, standby: 0, offline: 0, error: 0 };
    Object.values(deviceDatabase).forEach(d => { if (counts[d.status] !== undefined) counts[d.status]++; });
    document.getElementById('dc-count-connected').textContent = counts.connected;
    document.getElementById('dc-count-standby').textContent = counts.standby;
    document.getElementById('dc-count-offline').textContent = counts.offline;
    document.getElementById('dc-count-error').textContent = counts.error;
}

// 筛选设备
function filterDevices(status, btn) {
    currentFilter = status;
    document.querySelectorAll('.dc-tab').forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');
    applyDeviceFilter();
}

function filterByBrand(brand) {
    currentBrand = brand;
    applyDeviceFilter();
}

function applyDeviceFilter() {
    document.querySelectorAll('.dc-device-card').forEach(card => {
        const matchStatus = currentFilter === 'all' || card.dataset.status === currentFilter;
        const matchBrand = currentBrand === 'all' || card.dataset.brand === currentBrand;
        card.style.display = (matchStatus && matchBrand) ? 'flex' : 'none';
    });
}

// 扫描设备
function scanDevices() {
    showNotification('正在扫描局域网内的设备...', 'info');
    setTimeout(() => {
        showNotification('扫描完成，共发现 7 台设备', 'success');
    }, 2000);
}

// 打开添加设备弹窗
function openAddDeviceModal() {
    document.getElementById('dcAddModal').style.display = 'flex';
}

function closeAddDeviceModal(event) {
    if (!event || event.target === document.getElementById('dcAddModal')) {
        document.getElementById('dcAddModal').style.display = 'none';
    }
}

function updateAddDeviceProtocol() {
    const brand = document.getElementById('addDeviceBrand').value;
    const protocolSelect = document.getElementById('addDeviceProtocol');
    const protocolMap = {
        dji: ['DJI SDK (USB/Wi-Fi)', '4G 图传'],
        xag: ['XAG API', '4G/5G'],
        huace: ['MAVLink UDP', 'MAVLink TCP', '4G'],
        autel: ['Autel SDK', '4G'],
        mavlink: ['MAVLink UDP', 'MAVLink TCP', '串口'],
        custom: ['MQTT', 'WebSocket', 'REST API', 'MAVLink UDP']
    };
    const options = protocolMap[brand] || ['MAVLink UDP'];
    protocolSelect.innerHTML = options.map(o => `<option>${o}</option>`).join('');
}

function confirmAddDevice() {
    const brand = document.getElementById('addDeviceBrand').value;
    const model = document.getElementById('addDeviceModel').value || '未知型号';
    const sn = document.getElementById('addDeviceSN').value || 'SN-' + Date.now();
    const alias = document.getElementById('addDeviceAlias').value;

    const brandNames = { dji: '道通', xag: '极飞', huace: '华测', autel: '道通', mavlink: 'MAVLink', custom: '自定义' };
    const displayName = alias || `${brandNames[brand]} ${model}`;

    showNotification(`正在连接 ${displayName}...`, 'info');
    document.getElementById('dcAddModal').style.display = 'none';

    setTimeout(() => {
        showNotification(`${displayName} 连接成功！`, 'success');
        updateStatusCounts();
    }, 2000);
}

// 打开设备配置
function openDeviceConfig() {
    if (!currentDeviceId) return;
    const device = deviceDatabase[currentDeviceId];
    showNotification(`正在打开 ${device.name} 的配置界面...`, 'info');
}
